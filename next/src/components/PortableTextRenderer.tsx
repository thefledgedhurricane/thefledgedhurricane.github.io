"use client";

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { useEffect, useRef, ReactNode, useState } from 'react';
import mermaid from 'mermaid';
import Prism from 'prismjs';

// Import Prism languages (themes imported in globals.css)
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
// Requis pour éviter l'erreur tokenizePlaceholders avec JSX/TSX/PHP
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-markup';

// Language normalization for Prism aliases and custom labels
const LANGUAGE_ALIASES: Record<string, string> = {
  js: 'javascript',
  jsx: 'jsx',
  ts: 'typescript',
  tsx: 'tsx',
  py: 'python',
  python3: 'python',
  rb: 'ruby',
  sh: 'bash',
  zsh: 'bash',
  shell: 'bash',
  yml: 'yaml',
  md: 'markdown',
  html: 'markup',
  xml: 'markup',
  'c++': 'cpp',
  'c#': 'csharp',
  golang: 'go',
  mermaid: 'markdown',
  markmap: 'markdown',
};

function normalizeLanguage(lang?: string): string {
  if (!lang) return 'text';
  const key = lang.toLowerCase().trim();
  return LANGUAGE_ALIASES[key] || key;
}

// Code highlighting component
function HighlightedCode({ code, language }: { code: string; language: string }) {
  let html: string | null = null;
  try {
    const grammar = (Prism as any).languages[language] || (Prism as any).languages.plain || (Prism as any).languages.text;
    html = (Prism as any).highlight(code, grammar, language);
  } catch (e) {
    html = null;
  }
  return (
    <code
      className={`language-${language}`}
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Roboto Mono", Menlo, monospace'
      }}
      {...(html ? { dangerouslySetInnerHTML: { __html: html } } : {})}
    >
      {!html ? code : null}
    </code>
  );
}

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
        ref.current.innerHTML = '<p class="text-red-500">Error rendering Mermaid diagram. Please check the syntax.</p>';
      }
    }
  }, [chart]);

  return <div ref={ref} className="my-6" />;
}

function MarkMapDiagram({ content, height = "400px" }: { content: string; height?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const mmRef = useRef<any>();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [{ Transformer }, { Markmap }] = await Promise.all([
          import('markmap-lib'),
          import('markmap-view'),
        ]);
        if (!svgRef.current || cancelled) return;
        const transformer = new Transformer();
        const { root } = transformer.transform(content);
        if (!mmRef.current) {
          mmRef.current = Markmap.create(svgRef.current);
        }
        mmRef.current.setData(root);
        mmRef.current.fit();
      } catch (err) {
        console.error('Markmap rendering error:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
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
        <button 
          onClick={() => navigator.clipboard.writeText(value.code)}
          className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors"
        >
          Copy
        </button>
      </div>
  <pre tabIndex={0} className={`p-4 overflow-x-auto text-sm leading-relaxed language-${normalizeLanguage(value.language || 'text')}`}>
  <HighlightedCode code={value.code} language={normalizeLanguage(value.language || 'text')} />
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
  // Pré-normalisation : insérer des sauts de ligne devant des titres markdown restés inline dans un seul bloc
  // Ex: "texte ## Titre" => "texte\n## Titre" afin que le parser de lignes détecte bien le heading.
  let normalized = content
    .replace(/\r\n?/g, '\n')
    // headings collés dans un paragraphe
    .replace(/(?<!^)\s(#{1,6}\s)/g, '\n$1')
    // puces inline typiques " - ✅" ou " - **" (séparation bullet list)
    .replace(/ (-(?=\s(?:✅|\*\*|\*|\+|\[)))/g, '\n$1');

  // Notion/Obsidian-like markdown parsing with proper code block handling
  const parseContent = (text: string) => {
    // Define all regex patterns for different block types
        const patterns = {
          // Support both ``` and ~~~ fences with backreference to the opener, optional language then params
          codeBlock: /(```|~~~)([a-zA-Z0-9+#-]+)?[^\n]*\n([\s\S]*?)\n\1/g,
          mermaid: /(```|~~~)mermaid[^\n]*\n([\s\S]*?)\n\1/g,
          markmap: /(```|~~~)markmap[^\n]*\n([\s\S]*?)\n\1/g,
          markmapShortcode: /(```|~~~)markmap\s*\{([^}]*)\}[^\n]*\n([\s\S]*?)\n\1/g,
          callout: /\{\{%\/\*\s*callout\s+(\w+)\s*\*\/\%\}\}([\s\S]*?)\{\{%\/\*\s*\/callout\s*\*\/\%\}\}|\{\{%\s*callout\s+(\w+)\s*%\}\}([\s\S]*?)\{\{%\s*\/callout\s*%\}\}/g
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
          const language = match[2] || 'text'; // Default to 'text' if no language specified
          const codeContent = match[3];
      
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
        content: match[2]
      });
    }

    // Handle markmap blocks
  while ((match = patterns.markmap.exec(text)) !== null) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        type: 'markmap',
        content: match[2]
      });
    }

    // Handle markmap shortcode blocks with parameters
  while ((match = patterns.markmapShortcode.exec(text)) !== null) {
      const params = match[2];
      const heightMatch = params.match(/height="([^"]*)"/); 
      const height = heightMatch ? heightMatch[1] : '400px';
      
      allMatches.push({
        index: match.index,
        length: match[0].length,
        type: 'markmap',
        content: match[3],
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
    // Inline markdown parser used in paragraphs and table cells
    const parseInline = (str: string) => {
      const parts: ReactNode[] = [];
      let lastIndex = 0;

      // Order matters: strong before em to avoid overlap; we'll skip overlaps explicitly.
      const patterns: Array<{
        type: 'strong' | 'em' | 'link' | 'code';
        regex: RegExp;
        render: (content: string, key: number, url?: string) => JSX.Element;
      }> = [
        {
          type: 'strong',
          regex: /\*\*(.+?)\*\*/g,
          render: (c, k) => <strong key={k} className="font-bold text-gray-900 dark:text-white">{c}</strong>
        },
        {
          type: 'link',
          regex: /\[([^\]]+)\]\(([^)]+)\)/g,
          render: (c, k, url) => (
            <a key={k} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-500/30 hover:decoration-blue-500 decoration-2 underline-offset-2 transition-colors duration-200 font-medium">{c}</a>
          )
        },
        {
          type: 'code',
          regex: /`([^`]+)`/g,
          render: (c, k) => <code key={k} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm font-mono text-primary-600 dark:text-primary-400 border border-gray-200 dark:border-gray-700">{c}</code>
        },
        {
          type: 'em',
          // Italic: single * surrounding non-*; prevent matching inside **bold**
          regex: /(?<!\*)\*([^*]+?)\*(?!\*)/g,
          render: (c, k) => <em key={k} className="italic text-gray-800 dark:text-gray-200">{c}</em>
        }
      ];

      interface Match { index: number; length: number; content: string; url?: string; render: (content: string, key: number, url?: string) => JSX.Element; }
      const matches: Match[] = [];

      patterns.forEach(p => {
        let m: RegExpExecArray | null;
        const r = new RegExp(p.regex.source, p.regex.flags);
        while ((m = r.exec(str)) !== null) {
          const full = m[0];
          const content = m[1];
            // Skip empty content or malformed
          if (!content) continue;
          const start = m.index;
          const end = start + full.length;
          // Skip if overlaps previously stored match
          if (matches.some(ex => !(end <= ex.index || start >= ex.index + ex.length))) continue;
          if (p.type === 'link') {
            matches.push({ index: start, length: full.length, content, url: m[2], render: p.render });
          } else {
            matches.push({ index: start, length: full.length, content, render: p.render });
          }
        }
      });

      matches.sort((a,b) => a.index - b.index);
      matches.forEach((m, i) => {
        if (m.index > lastIndex) parts.push(str.slice(lastIndex, m.index));
        parts.push(m.render(m.content, m.index + i, m.url));
        lastIndex = m.index + m.length;
      });
      if (lastIndex < str.length) parts.push(str.slice(lastIndex));
      return parts.length ? parts : [str];
    };

    // Robust table parsing: supports optional leading/trailing pipes, escaped pipes (\|), and inline code
    const splitRow = (row: string): string[] => {
      // Trim optional leading/trailing pipes without losing empties
      let s = row.trim();
      if (s.startsWith('|')) s = s.slice(1);
      if (s.endsWith('|')) s = s.slice(0, -1);
      const cells: string[] = [];
      let buf = '';
      let inCode = false;
      for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        const prev = s[i - 1];
        if (ch === '`') {
          // toggle inline code (do not support code blocks inside table)
          inCode = !inCode;
          buf += ch;
          continue;
        }
        if (ch === '|' && prev !== '\\' && !inCode) {
          cells.push(buf.trim());
          buf = '';
          continue;
        }
        buf += ch;
      }
      cells.push(buf.trim());
      return cells;
    };

    const isDividerLine = (line: string) => {
      const s = line.trim().replace(/^\|/, '').replace(/\|$/, '');
      const parts = s.split('|').map(p => p.trim());
      return parts.length > 0 && parts.every(p => /^:?-{3,}:?$/.test(p));
    };

    const parseTables = (content: string) => {
      const lines = content.split(/\n/);
      const out: any[] = [];
      let i = 0;
      let buffer = '';

      const flushText = () => {
        if (buffer.length) {
          out.push({ type: 'text', content: buffer });
          buffer = '';
        }
      };

      while (i < lines.length) {
        const headerLine = lines[i];
        const dividerLine = lines[i + 1];
        if (headerLine && dividerLine && headerLine.includes('|') && isDividerLine(dividerLine)) {
          flushText();
          const headers = splitRow(headerLine);
          const alignParts = splitRow(dividerLine).map(p => p.trim());
          const aligns = alignParts.map(p => (p.startsWith(':') && p.endsWith(':')) ? 'center' : (p.endsWith(':') ? 'right' : 'left'));
          i += 2;
          const rows: string[][] = [];
          while (i < lines.length && lines[i].includes('|')) {
            rows.push(splitRow(lines[i]));
            i++;
          }
          out.push({ type: 'table', headers, rows, aligns });
        } else {
          buffer += (buffer ? '\n' : '') + headerLine;
          i++;
        }
      }
      flushText();
      return out.length ? out : [{ type: 'text', content }];
    };

  const partsWithTables = parseTables(text);

    return partsWithTables.map((tablePart, tableIndex) => {
      if (tablePart.type === 'table') {
        return (
          <div key={`table-${tableIndex}`} className="my-6">
            <div className="overflow-x-auto">
              <table className="obsidian-table">
                <thead>
                  <tr>
                    {(tablePart.headers || []).map((header: string, index: number) => (
                      <th key={index} className={
                        (tablePart.aligns?.[index] === 'center')
                          ? 'text-center'
                          : (tablePart.aligns?.[index] === 'right' ? 'text-right' : 'text-left')
                      }>
                        {parseInline(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(tablePart.rows || []).map((row: string[], rowIndex: number) => (
                    <tr key={rowIndex}>
                      {row.map((cell: string, cellIndex: number) => (
                        <td key={cellIndex} className={
                          (tablePart.aligns?.[cellIndex] === 'center')
                            ? 'text-center'
                            : (tablePart.aligns?.[cellIndex] === 'right' ? 'text-right' : 'text-left')
                        }>
                          {parseInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      // Process regular text content
      const textContent = tablePart.content || '';
      return textContent
        .split('\n')
        .map((line: string, index: number) => {
          // Headers - GitHub style with proper spacing
          if (line.startsWith('# ')) {
            return (
              <h1 key={`${tableIndex}-${index}`} className="text-3xl md:text-4xl font-bold mb-4 mt-8 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                {parseInline(line.slice(2))}
              </h1>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h2 key={`${tableIndex}-${index}`} className="text-2xl md:text-3xl font-bold mb-3 mt-6 pb-2 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white">
                {parseInline(line.slice(3))}
              </h2>
            );
          }
          if (line.startsWith('### ')) {
            return (
              <h3 key={`${tableIndex}-${index}`} className="text-xl md:text-2xl font-semibold mb-2 mt-4 text-gray-900 dark:text-white">
                {parseInline(line.slice(4))}
              </h3>
            );
          }
          if (line.startsWith('#### ')) {
            return (
              <h4 key={`${tableIndex}-${index}`} className="text-lg md:text-xl font-semibold mb-2 mt-4 text-gray-900 dark:text-white">
                {parseInline(line.slice(5))}
              </h4>
            );
          }
          if (line.startsWith('##### ')) {
            return (
              <h5 key={`${tableIndex}-${index}`} className="text-base md:text-lg font-semibold mb-2 mt-3 text-gray-900 dark:text-white">
                {parseInline(line.slice(6))}
              </h5>
            );
          }
          if (line.startsWith('###### ')) {
            return (
              <h6 key={`${tableIndex}-${index}`} className="text-sm md:text-base font-semibold mb-2 mt-3 text-gray-800 dark:text-gray-200 tracking-wide uppercase">
                {parseInline(line.slice(7))}
              </h6>
            );
          }
          
          // Horizontal rules - GitHub style
          if (line.trim().match(/^---+$/)) {
            return (
              <hr key={`${tableIndex}-${index}`} className="my-8 border-0 border-t border-gray-200 dark:border-gray-700" />
            );
          }
          
          // Numbered lists - 1., 2., etc.
          if (line.match(/^\d+\.\s/)) {
            return (
              <div key={`${tableIndex}-${index}`} className="mb-2">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold mt-1 text-base leading-6 min-w-[1.5em]">
                    {line.match(/^(\d+)\./)?.[1]}.
                  </span>
                  <div className="flex-1 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-7">
                    {parseInline(line.replace(/^\d+\.\s/, ''))}
                  </div>
                </div>
              </div>
            );
          }
          
          // Bullet lists with markdown styling - GitHub/Notion style
          if (line.match(/^[-*+]\s/)) {
            return (
              <div key={`${tableIndex}-${index}`} className="mb-2">
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 dark:text-gray-400 mt-1 text-lg leading-6">•</span>
                  <div className="flex-1 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-7">
                    {parseInline(line.replace(/^[-*+]\s/, ''))}
                  </div>
                </div>
              </div>
            );
          }
          
          // Empty lines
          if (line.trim() === '') {
            return <br key={`${tableIndex}-${index}`} />;
          }
          
          // Regular paragraphs with HTML tag parsing - improved GitHub/Notion style
          return (
            <p key={`${tableIndex}-${index}`} className="mb-5 leading-7 text-gray-800 dark:text-gray-200 text-base md:text-lg">
              {parseInline(line)}
            </p>
          );
        });
    }).flat();
  };

  const parts = parseContent(normalized);
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {parts.map((part, index) => {
        if (part.type === 'codeBlock') {
          // Render code blocks with MDN-like styling
          const language = normalizeLanguage(('language' in part ? part.language : undefined) || 'text');
          // Clean up the code content by trimming excessive whitespace and empty lines
          const cleanCode = part.content
            .replace(/^\n+|\n+$/g, '') // Remove leading/trailing newlines
            .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace multiple empty lines with double newline
            .trim();
          
          return (
            <div key={index} className="my-8 group">
              <div className="relative overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm">
                {/* MDN-style header */}
                <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 text-gray-300 px-4 py-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="ml-2 font-mono text-gray-400 uppercase tracking-wide">
                      {language}
                    </span>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(cleanCode)}
                    className="opacity-70 hover:opacity-100 transition-opacity text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 hover:text-white border border-gray-600 font-medium"
                    title="Copy to clipboard"
                  >
                    Copy
                  </button>
                </div>
                {/* Code content */}
                <div className="bg-gray-900 dark:bg-black">
                  <pre tabIndex={0} className={`p-4 overflow-x-auto text-sm leading-6 font-mono language-${language}`}>
                    <HighlightedCode code={cleanCode} language={language} />
                  </pre>
                </div>
              </div>
            </div>
          );
        } else if (part.type === 'mermaid') {
          return <RenderableCodeBlock key={index} value={{ language: 'mermaid', code: part.content }} />;
        } else if (part.type === 'markmap') {
          const height = 'height' in part ? part.height : '400px';
          return <RenderableCodeBlock key={index} value={{ language: 'markmap', code: part.content, height }} />;
        } else if (part.type === 'callout') {
          // Render callout as an Obsidian-like callout component
          const typeStyles = {
            note: {
              bg: 'bg-gray-50 dark:bg-gray-900/40',
              border: 'border-l-4 border-gray-400',
              icon: '📝',
              textColor: 'text-gray-900 dark:text-gray-100',
            },
            info: {
              bg: 'bg-blue-50 dark:bg-blue-900/30',
              border: 'border-l-4 border-blue-500',
              icon: '💡',
              textColor: 'text-blue-900 dark:text-blue-100',
            },
            warning: {
              bg: 'bg-yellow-50 dark:bg-yellow-900/30',
              border: 'border-l-4 border-yellow-500',
              icon: '⚠️',
              textColor: 'text-yellow-900 dark:text-yellow-100',
            },
            error: {
              bg: 'bg-red-50 dark:bg-red-900/30',
              border: 'border-l-4 border-red-500',
              icon: '🚨',
              textColor: 'text-red-900 dark:text-red-100',
            },
            success: {
              bg: 'bg-green-50 dark:bg-green-900/30',
              border: 'border-l-4 border-green-500',
              icon: '✅',
              textColor: 'text-green-900 dark:text-green-100',
            }
          };
          
          const calloutType = ('calloutType' in part ? part.calloutType : undefined) || 'info';
          const style = typeStyles[calloutType as keyof typeof typeStyles] || typeStyles.info;
          
          return (
            <div key={index} className={`my-6 p-4 rounded-lg border-l-4 ${style.bg} ${style.border} ${style.textColor}`}>
              <div className="flex items-center gap-2 font-semibold mb-3 text-lg">
                <span className="text-xl">{style.icon}</span>
                <span className="capitalize">{calloutType}</span>
              </div>
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
      // Render code blocks with MDN-like styling
      const language = normalizeLanguage(value.language || 'text');
      const cleanCode = value.code
        .replace(/^\n+|\n+$/g, '') // Remove leading/trailing newlines
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace multiple empty lines with double newline
        .trim();

      return (
        <div className="my-8 group">
          <div className="relative overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm">
            <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 text-gray-300 px-4 py-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-2 font-mono text-gray-400 uppercase tracking-wide">
                  {language}
                </span>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(cleanCode)}
                className="opacity-70 hover:opacity-100 transition-opacity text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 hover:text-white border border-gray-600 font-medium"
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
            <div className="bg-gray-900 dark:bg-black">
              <pre tabIndex={0} className={`p-4 overflow-x-auto text-sm leading-6 font-mono language-${language}`}>
                <HighlightedCode code={cleanCode} language={language} />
              </pre>
            </div>
          </div>
        </div>
      );
    },
    // Math block support
    mathBlock: ({ value }: any) => (
      <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center font-mono text-lg text-gray-800 dark:text-gray-200">
          {value.formula}
        </div>
      </div>
    ),
    // Table support - Clean professional style
    table: ({ value }: any) => (
      <div className="my-8 group">
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                {value.rows[0]?.cells.map((cell: any, index: number) => (
                  <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0">
                    <PortableText value={cell} components={portableTextComponents} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {value.rows.slice(1).map((row: any, rowIndex: number) => (
                <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
                  {row.cells.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex} className="px-6 py-4 text-sm border-r border-gray-200 dark:border-gray-700 last:border-r-0 font-mono bg-gray-50 dark:bg-gray-800/30">
                      <div className="text-gray-700 dark:text-gray-300">
                        <PortableText value={cell} components={portableTextComponents} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    // Callout/Alert blocks - Notion-style
  callout: ({ value }: any) => {
      const typeStyles = {
        info: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-l-4 border-blue-500',
          icon: '💡',
          textColor: 'text-blue-900 dark:text-blue-100'
        },
        warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      border: 'border-l-4 border-yellow-500',
          icon: '⚠️',
          textColor: 'text-yellow-900 dark:text-yellow-100'
        },
        error: {
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-l-4 border-red-500',
          icon: '🚨',
          textColor: 'text-red-900 dark:text-red-100'
        },
        success: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-l-4 border-green-500',
          icon: '✅',
          textColor: 'text-green-900 dark:text-green-100'
        },
        note: {
      bg: 'bg-gray-50 dark:bg-gray-900/40',
      border: 'border-l-4 border-gray-400',
          icon: '📝',
          textColor: 'text-gray-900 dark:text-gray-100'
        }
      };
      
      const style = typeStyles[value.type as keyof typeof typeStyles] || typeStyles.info;
      
      return (
        <div className={`my-6 p-4 rounded-md ${style.bg} ${style.textColor} obsidian-callout`}>
          {value.title && (
            <div className={`mb-2 ${style.border} pl-3 font-semibold flex items-center gap-2`}>
              <span>{style.icon}</span>
              <span>{value.title}</span>
            </div>
          )}
          <div>
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
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-6 pb-3 border-b border-gray-200 dark:border-gray-700 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-5 pb-2 border-b border-gray-100 dark:border-gray-800 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3 leading-tight">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mt-5 mb-2 leading-tight">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2 leading-tight uppercase tracking-wide">
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
      const hasMarkdownSyntax = /^#{1,6}\s|\*\*.*?\*\*|\*[^*].*?\*|\[.*?\]\(.*?\)|^[-*+]\s|^\d+\.\s|<\/?(?:mark|strong|b|em|i|u|s|del|code|kbd|small|sub|sup)>|✅|❤️|👀|🎯|💬|---+|[✨🚀💡⚠️🔥🎉]|\|.*\|.*\n\|[-\s|:]+\|/m.test(textContent);
  const hasCodeBlocks = /(```|~~~)[\w-]*\n[\s\S]*?\n\1/m.test(textContent);
      const hasHugoShortcode = /\{\{%\/\*\s*callout\s+\w+\s*\*\/%\}\}|\{\{%\s*callout\s+\w+\s*%\}\}/m.test(textContent);
      
      if ((hasMarkdownSyntax || hasCodeBlocks || hasHugoShortcode) && textContent.length > 0) {
        return <EnhancedMarkdown content={textContent} />;
      }
      
      // Fallback to regular paragraph rendering - improved GitHub/Notion style
      return (
        <p className="mb-5 leading-7 text-gray-800 dark:text-gray-200 text-base md:text-lg">
          {children}
        </p>
      );
    },
    blockquote: ({ children }: any) => (
      <div className="my-6">
        <blockquote className="border-l-4 border-gray-400 dark:border-gray-600 pl-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-r-lg">
          <div className="text-gray-800 dark:text-gray-200 italic text-base md:text-lg leading-7">
            {children}
          </div>
        </blockquote>
      </div>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside ml-6 space-y-2 mb-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-7">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside ml-6 space-y-2 mb-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-7">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="pl-2 mb-1">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="pl-2 mb-1">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-800 dark:text-gray-200">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
        {children}
      </code>
    ),
    underline: ({ children }: any) => (
      <u className="underline decoration-gray-400 dark:decoration-gray-500 decoration-2 underline-offset-2">{children}</u>
    ),
    strikeThrough: ({ children }: any) => (
      <s className="line-through text-gray-500 dark:text-gray-400">{children}</s>
    ),
    highlight: ({ children }: any) => (
      <mark className="bg-yellow-200 dark:bg-yellow-800/60 px-1 py-0.5 rounded text-gray-900 dark:text-yellow-100">
        {children}
      </mark>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : undefined}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-500/30 hover:decoration-blue-500 decoration-2 underline-offset-2 transition-colors duration-200 font-medium"
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
    return (
      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
        <p className="text-gray-500 dark:text-gray-400 italic">No content available</p>
      </div>
    );
  }
  
  if (!Array.isArray(content)) {
    return (
      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
        <p className="text-red-500 dark:text-red-400">Invalid content format</p>
      </div>
    );
  }
  
  return (
    <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
      <div className="markdown-content">
        <PortableText value={content} components={portableTextComponents} />
      </div>
    </div>
  );
}

// Export the components for individual use if needed
export { portableTextComponents };