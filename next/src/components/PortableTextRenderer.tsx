'use client';

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { useEffect, useRef, ReactNode, useState } from 'react';
import mermaid from 'mermaid';
import { Markmap } from 'markmap-view';
import { Transformer } from 'markmap-lib';

// Mermaid component for rendering diagrams
function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  useEffect(() => {
    if (ref.current) {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        ref.current.innerHTML = `<div class="mermaid" id="${id}">${chart}</div>`;
        const mermaidElement = ref.current.querySelector('.mermaid');
        if (mermaidElement) {
          mermaid.init(undefined, mermaidElement as HTMLElement);
        }
      } catch (error) {
        console.error('Mermaid rendering error:', error);
      }
    }
  }, [chart]);

  return <div ref={ref} className="my-6" />;
}

function MarkMapDiagram({ content, height = "400px" }: { content: string; height?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const mmRef = useRef<Markmap>();

  useEffect(() => {
    if (svgRef.current) {
      const transformer = new Transformer();
      const { root } = transformer.transform(content);
      
      if (!mmRef.current) {
        mmRef.current = Markmap.create(svgRef.current);
      }
      
      mmRef.current.setData(root);
      mmRef.current.fit();
    }
  }, [content]);

  return (
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <svg ref={svgRef} style={{ width: '100%', height }} />
    </div>
  );
}

function RenderableCodeBlock({ value }: { value: any }) {
  const [showRendered, setShowRendered] = useState(true);

  const renderVisualization = () => {
    if (value.language === 'mermaid') {
      return <MermaidDiagram chart={value.code} />;
    } else if (value.language === 'markmap') {
      const height = value.height || '400px';
      return <MarkMapDiagram content={value.code} height={height} />;
    }
    return null;
  };

  const renderCodeBlock = () => (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-700">
      <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 font-medium border-b border-gray-700 flex items-center justify-between">
        <span>{value.language || 'code'}</span>
        <button className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors">
          Copy
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className={`language-${value.language || 'text'} text-gray-100`}>
          {value.code}
        </code>
      </pre>
    </div>
  );

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {value.language} {showRendered ? 'Diagram' : 'Code'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowRendered(false)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              !showRendered
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setShowRendered(true)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              showRendered
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Render
          </button>
        </div>
      </div>
      {showRendered ? renderVisualization() : renderCodeBlock()}
    </div>
  );
}

// Enhanced markdown renderer with Mermaid and Hugo shortcode support
function EnhancedMarkdown({ content }: { content: string }) {
  // Notion/Obsidian-like markdown parsing with proper code block handling
  const parseContent = (text: string) => {
    // Define all regex patterns for different block types
    const patterns = {
      codeBlock: /```(\w+)?\n([\s\S]*?)\n```/g,
      mermaid: /```mermaid\n([\s\S]*?)\n```/g,
      markmap: /```markmap\n([\s\S]*?)\n```/g,
      markmapShortcode: /```markmap\s*\{([^}]*)\}\s*\n([\s\S]*?)\n```/g,
      callout: /\{\{%\/\*\s*callout\s+(\w+)\s*\*\/%\}\}([\s\S]*?)\{\{%\/\*\s*\/callout\s*\*\/%\}\}|\{\{%\s*callout\s+(\w+)\s*%\}\}([\s\S]*?)\{\{%\s*\/callout\s*%\}\}/g
    };

    const parts = [];
    let lastIndex = 0;
    let match;

    // Collect all matches with their types
    const allMatches: Array<{
      index: number;
      length: number;
      type: string;
      content: string;
      language?: string;
      calloutType?: string;
      height?: string;
    }> = [];

    // Handle regular code blocks (not mermaid/markmap)
    while ((match = patterns.codeBlock.exec(text)) !== null) {
      const language = match[1] || 'text';
      const codeContent = match[2];
      
      // Skip if it's a mermaid or markmap block (they'll be handled separately)
      if (language !== 'mermaid' && language !== 'markmap') {
        allMatches.push({
          index: match.index,
          length: match[0].length,
          type: 'codeBlock',
          content: codeContent,
          language: language
        });
      }
    }

    // Handle mermaid blocks
    while ((match = patterns.mermaid.exec(text)) !== null) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        type: 'mermaid',
        content: match[1]
      });
    }

    // Handle markmap blocks
    while ((match = patterns.markmap.exec(text)) !== null) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        type: 'markmap',
        content: match[1]
      });
    }

    // Handle markmap shortcode blocks with parameters
    while ((match = patterns.markmapShortcode.exec(text)) !== null) {
      const params = match[1];
      const heightMatch = params.match(/height="([^"]*)"/); 
      const height = heightMatch ? heightMatch[1] : '400px';
      
      allMatches.push({
        index: match.index,
        length: match[0].length,
        type: 'markmap',
        content: match[2],
        height: height
      });
    }

    // Handle callouts
    while ((match = patterns.callout.exec(text)) !== null) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        type: 'callout',
        calloutType: match[1] || match[3],
        content: (match[2] || match[4]).trim()
      });
    }

    // Sort all matches by index
    allMatches.sort((a, b) => a.index - b.index);

    // Process all matches in order
    for (const matchItem of allMatches) {
      // Add text before this match
      if (matchItem.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, matchItem.index)
        });
      }
      
      // Add the match
      parts.push(matchItem);
      
      lastIndex = matchItem.index + matchItem.length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }
    
    return parts;
  };

  const formatText = (text: string) => {
    // Parse HTML tags and basic markdown formatting
    const parseHtmlTags = (str: string) => {
      const parts = [];
      let lastIndex = 0;
      
      // Define HTML tag patterns with their corresponding React components
      const tagPatterns = [
        {
          regex: /<mark>(.*?)<\/mark>/g,
          component: (content: string, key: number) => (
            <mark key={key} className="bg-yellow-200 dark:bg-yellow-800 px-1 py-0.5 rounded">{content}</mark>
          )
        },
        {
          regex: /<strong>(.*?)<\/strong>/g,
          component: (content: string, key: number) => (
            <strong key={key} className="font-bold text-gray-900 dark:text-white">{content}</strong>
          )
        },
        {
          regex: /<b>(.*?)<\/b>/g,
          component: (content: string, key: number) => (
            <strong key={key} className="font-bold text-gray-900 dark:text-white">{content}</strong>
          )
        },
        {
          regex: /<em>(.*?)<\/em>/g,
          component: (content: string, key: number) => (
            <em key={key} className="italic text-gray-800 dark:text-gray-200">{content}</em>
          )
        },
        {
          regex: /<i>(.*?)<\/i>/g,
          component: (content: string, key: number) => (
            <em key={key} className="italic text-gray-800 dark:text-gray-200">{content}</em>
          )
        },
        {
          regex: /<u>(.*?)<\/u>/g,
          component: (content: string, key: number) => (
            <u key={key} className="underline decoration-primary-500 decoration-2 underline-offset-2">{content}</u>
          )
        },
        {
          regex: /<s>(.*?)<\/s>/g,
          component: (content: string, key: number) => (
            <s key={key} className="line-through text-gray-500 dark:text-gray-400">{content}</s>
          )
        },
        {
          regex: /<del>(.*?)<\/del>/g,
          component: (content: string, key: number) => (
            <del key={key} className="line-through text-gray-500 dark:text-gray-400">{content}</del>
          )
        },
        {
          regex: /<code>(.*?)<\/code>/g,
          component: (content: string, key: number) => (
            <code key={key} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm font-mono text-primary-600 dark:text-primary-400 border border-gray-200 dark:border-gray-700">{content}</code>
          )
        },
        {
          regex: /<kbd>(.*?)<\/kbd>/g,
          component: (content: string, key: number) => (
            <kbd key={key} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600 shadow-sm">{content}</kbd>
          )
        },
        {
          regex: /<small>(.*?)<\/small>/g,
          component: (content: string, key: number) => (
            <small key={key} className="text-sm text-gray-600 dark:text-gray-400">{content}</small>
          )
        },
        {
          regex: /<sub>(.*?)<\/sub>/g,
          component: (content: string, key: number) => (
            <sub key={key} className="text-xs align-sub">{content}</sub>
          )
        },
        {
          regex: /<sup>(.*?)<\/sup>/g,
          component: (content: string, key: number) => (
            <sup key={key} className="text-xs align-super">{content}</sup>
          )
        }
      ];
      
      // Find all matches from all patterns
       const allMatches: Array<{
         index: number;
         length: number;
         content: string;
         component: (content: string, key: number) => JSX.Element;
         patternIndex: number;
       }> = [];
       tagPatterns.forEach((pattern, patternIndex) => {
         let match;
         const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
         while ((match = regex.exec(str)) !== null) {
           allMatches.push({
             index: match.index,
             length: match[0].length,
             content: match[1],
             component: pattern.component,
             patternIndex
           });
         }
       });
      
      // Sort matches by index
      allMatches.sort((a, b) => a.index - b.index);
      
      // Process matches in order
      allMatches.forEach((match, matchIndex) => {
        // Add text before the match
        if (match.index > lastIndex) {
          parts.push(str.slice(lastIndex, match.index));
        }
        // Add the matched component
        parts.push(match.component(match.content, match.index + matchIndex));
        lastIndex = match.index + match.length;
      });
      
      // Add remaining text
      if (lastIndex < str.length) {
        parts.push(str.slice(lastIndex));
      }
      
      return parts.length > 0 ? parts : [str];
    };
    
    return text
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mb-4 mt-8 pb-2 border-b border-gray-200 dark:border-gray-700">{parseHtmlTags(line.slice(2))}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold mb-3 mt-6">{parseHtmlTags(line.slice(3))}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-medium mb-2 mt-4">{parseHtmlTags(line.slice(4))}</h3>;
        }
        
        // Empty lines
        if (line.trim() === '') {
          return <br key={index} />;
        }
        
        // Regular paragraphs with HTML tag parsing
        return <p key={index} className="mb-4 leading-relaxed">{parseHtmlTags(line)}</p>;
      });
  };

  const parts = parseContent(content);
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {parts.map((part, index) => {
        if (part.type === 'codeBlock') {
          // Render code blocks with Notion-like styling
          const language = ('language' in part ? part.language : undefined) || 'text';
          return (
            <div key={index} className="my-6 rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-sm font-mono text-gray-300 capitalize">{language}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(part.content)}
                  className="text-gray-400 hover:text-white transition-colors text-sm px-2 py-1 rounded hover:bg-gray-700"
                  title="Copy code"
                >
                  📋 Copy
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                <code className={`language-${language} text-gray-100 font-mono`}>
                  {part.content}
                </code>
              </pre>
            </div>
          );
        } else if (part.type === 'mermaid') {
          return <RenderableCodeBlock key={index} value={{ language: 'mermaid', code: part.content }} />;
        } else if (part.type === 'markmap') {
          const height = 'height' in part ? part.height : '400px';
          return <RenderableCodeBlock key={index} value={{ language: 'markmap', code: part.content, height }} />;
        } else if (part.type === 'callout') {
          // Render Hugo callout as a styled callout component
          const typeStyles = {
            note: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
            info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
            warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
            error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
            success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
          };
          
          const calloutType = ('calloutType' in part ? part.calloutType : undefined) || 'info';
          const styleClass = typeStyles[calloutType as keyof typeof typeStyles] || typeStyles.info;
          
          return (
            <div key={index} className={`my-6 p-4 rounded-lg border-l-4 ${styleClass}`}>
              <div className="prose prose-sm max-w-none">
                {formatText(part.content)}
              </div>
            </div>
          );
        }
        return (
          <div key={index}>
            {formatText(part.content)}
          </div>
        );
      })}
    </div>
  );
}

// Enhanced Portable Text components for better markdown rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(1200).height(800).url()}
          alt={value.alt || 'Content image'}
          width={1200}
          height={800}
          className="rounded-xl shadow-lg w-full h-auto"
          priority={false}
        />
        {value.caption && (
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3 italic font-medium">
            {value.caption}
          </p>
        )}
      </div>
    ),
    codeBlock: ({ value }: any) => {
      // Create a toggleable component for renderable languages
      if (value.language === 'mermaid' || value.language === 'markmap') {
        return <RenderableCodeBlock value={value} />;
      }
      
      return (
        <div className="my-8 group">
          <div className="relative">
            {value.filename && (
              <div className="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-gray-700">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 0v12h12V4H4z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zM6 12a1 1 0 011-1h3a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  {value.filename}
                </span>
                <span className="text-xs text-gray-500">{value.language || 'text'}</span>
              </div>
            )}
            <pre className={`bg-gray-900 text-gray-100 p-6 overflow-x-auto font-mono text-sm leading-relaxed ${
              value.filename ? 'rounded-b-lg' : 'rounded-lg'
            } border border-gray-700`}>
              <code className={`language-${value.language || 'text'}`}>
                {value.code}
              </code>
            </pre>
          </div>
        </div>
      );
    },
    // Math block support
    mathBlock: ({ value }: any) => (
      <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-center font-mono text-lg">
          {value.formula}
        </div>
      </div>
    ),
    // Callout/Alert blocks
    callout: ({ value }: any) => {
      const typeStyles = {
        info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
        error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
        success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
      };
      
      return (
        <div className={`my-6 p-4 rounded-lg border-l-4 ${typeStyles[value.type as keyof typeof typeStyles] || typeStyles.info}`}>
          {value.title && (
            <h4 className="font-semibold mb-2">{value.title}</h4>
          )}
          <div className="prose prose-sm max-w-none">
            <PortableText value={value.content} components={portableTextComponents} />
          </div>
        </div>
      );
    },
    // Handle markdown blocks
    markdown: ({ value }: any) => (
      <div className="my-4">
        <EnhancedMarkdown content={value.markdown} />
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3 leading-tight">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-lg font-semibold text-gray-900 dark:text-white mt-5 mb-2 leading-tight">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-base font-semibold text-gray-900 dark:text-white mt-4 mb-2 leading-tight">
        {children}
      </h6>
    ),
    normal: ({ children, value }: any) => {
      // Extract text content from the block value directly
      let textContent = '';
      if (value && value.children && Array.isArray(value.children)) {
        textContent = value.children
          .filter((child: any) => child._type === 'span')
          .map((child: any) => child.text || '')
          .join('');
      }
      
      // Check if content contains markdown-like syntax, code blocks, or Hugo shortcodes
      const hasMarkdownSyntax = /^#{1,6}\s|\*\*|\*[^*]|\[.*\]\(.*\)|^[-*+]\s|<\/?(?:mark|strong|b|em|i|u|s|del|code|kbd|small|sub|sup)>/m.test(textContent);
      const hasCodeBlocks = /```[\w]*\n[\s\S]*?\n```/m.test(textContent);
      const hasHugoShortcode = /\{\{%\/\*\s*callout\s+\w+\s*\*\/%\}\}|\{\{%\s*callout\s+\w+\s*%\}\}/m.test(textContent);
      
      if ((hasMarkdownSyntax || hasCodeBlocks || hasHugoShortcode) && textContent.length > 0) {
        return <EnhancedMarkdown content={textContent} />;
      }
      
      // Fallback to regular paragraph rendering
      return <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>;
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-500 pl-6 py-2 my-8 bg-gray-50 dark:bg-gray-800 rounded-r-lg">
        <div className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside ml-6 space-y-3 mb-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside ml-6 space-y-3 mb-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="pl-2">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="pl-2">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-800 dark:text-gray-200">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm font-mono text-primary-600 dark:text-primary-400 border border-gray-200 dark:border-gray-700">
        {children}
      </code>
    ),
    underline: ({ children }: any) => (
      <u className="underline decoration-primary-500 decoration-2 underline-offset-2">{children}</u>
    ),
    strikeThrough: ({ children }: any) => (
      <s className="line-through text-gray-500 dark:text-gray-400">{children}</s>
    ),
    highlight: ({ children }: any) => (
      <mark className="bg-yellow-200 dark:bg-yellow-800 px-1 py-0.5 rounded">{children}</mark>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : undefined}
        className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 underline decoration-primary-500/30 hover:decoration-primary-500 decoration-2 underline-offset-2 transition-colors duration-200 font-medium"
      >
        {children}
      </a>
    ),
  },
};

interface PortableTextRendererProps {
  content: any[];
}

export default function PortableTextRenderer({ content }: PortableTextRendererProps) {
  // Handle case where content might not be an array
  if (!content) {
    return <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">No content available</div>;
  }
  
  if (!Array.isArray(content)) {
    return <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">Invalid content format</div>;
  }
  
  return (
    <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
}

// Export the components for individual use if needed
export { portableTextComponents };