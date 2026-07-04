declare module 'prismjs' {
  const Prism: {
    highlight(code: string, grammar: any, language: string): string;
    languages: Record<string, any>;
  };
  export default Prism;
}

declare module 'prismjs/components/prism-python' {}
declare module 'prismjs/components/prism-javascript' {}
declare module 'prismjs/components/prism-typescript' {}
declare module 'prismjs/components/prism-bash' {}
declare module 'prismjs/components/prism-json' {}
declare module 'prismjs/components/prism-css' {}
declare module 'prismjs/components/prism-markup' {}
declare module 'prismjs/components/prism-c' {}
declare module 'prismjs/components/prism-cpp' {}
declare module 'prismjs/components/prism-java' {}
declare module 'prismjs/components/prism-sql' {}
declare module 'prismjs/components/prism-yaml' {}
