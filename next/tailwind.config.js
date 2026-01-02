/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // McKinsey-inspired professional color palette
        mckinsey: {
          // Navy Blue - McKinsey primary brand color
          navy: {
            50: '#E6F0F8',
            100: '#CCE1F1',
            200: '#99C3E3',
            300: '#66A5D5',
            400: '#3387C7',
            500: '#003C6C', // McKinsey navy
            600: '#003056',
            700: '#002441',
            800: '#00182B',
            900: '#000C16',
          },
          // Teal - McKinsey secondary accent
          teal: {
            50: '#E6F7F9',
            100: '#CCEFF3',
            200: '#99DFE7',
            300: '#66CFDB',
            400: '#33BFCF',
            500: '#00A0B0', // McKinsey teal
            600: '#00808D',
            700: '#00606A',
            800: '#004047',
            900: '#002024',
          },
          // Gray - Professional neutral tones
          gray: {
            50: '#F8F9FA',
            100: '#F1F3F5',
            200: '#E9ECEF',
            300: '#DEE2E6',
            400: '#CED4DA',
            500: '#6C757D', // Mid gray
            600: '#565E64',
            700: '#41464B',
            800: '#2B2F32',
            900: '#161719',
          },
          // Accent colors for highlights
          green: {
            50: '#E8F5E9',
            100: '#C8E6C9',
            200: '#A5D6A7',
            300: '#81C784',
            400: '#66BB6A',
            500: '#4CAF50',
            600: '#43A047',
            700: '#388E3C',
            800: '#2E7D32',
            900: '#1B5E20',
          },
        },
        // Primary color is McKinsey navy
        primary: {
          50: '#E6F0F8',
          100: '#CCE1F1',
          200: '#99C3E3',
          300: '#66A5D5',
          400: '#3387C7',
          500: '#003C6C', // McKinsey navy as primary
          600: '#003056',
          700: '#002441',
          800: '#00182B',
          900: '#000C16',
        },
        gray: {
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#808080',
          500: '#5A5A5A',
          600: '#3F3F3F',
          700: '#333333',
          800: '#262626',
          900: '#1A1A1A',
          950: '#0D0D0D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#2563eb',
              textDecoration: 'none',
              '&:hover': {
                color: '#1d4ed8',
                textDecoration: 'underline',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
            },
            h1: {
              fontSize: '2.25rem',
              fontWeight: '800',
              lineHeight: '2.5rem',
              marginBottom: '1rem',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '700',
              lineHeight: '2.25rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '2rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            blockquote: {
              borderLeftColor: '#2563eb',
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              backgroundColor: '#f8fafc',
              padding: '1rem',
              borderRadius: '0.5rem',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5rem',
            },
            li: {
              marginBottom: '0.5rem',
            },
          },
        },
        dark: {
          css: {
            color: '#f9fafb',
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            code: {
              backgroundColor: '#374151',
              color: '#f9fafb',
            },
            blockquote: {
              borderLeftColor: '#60a5fa',
              backgroundColor: '#1f2937',
              color: '#f9fafb',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};