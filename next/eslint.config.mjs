import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    rules: {
      // French educational prose uses apostrophes extensively; escaping them
      // adds noise without improving safety because React already escapes text.
      'react/no-unescaped-entities': 'off',
      // These React Compiler rules flag legacy visualizers that are not compiled.
      // Keep the standard hooks correctness rules enabled.
      'react-hooks/immutability': 'off',
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'public/admin/**',
    'tina/__generated__/**',
    '.tina-verify-*/**',
    '.pnpm-*/**',
    'next-env.d.ts',
  ]),
]);
