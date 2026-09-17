/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    // Sửa lại: quét cả thư mục ngoài root lẫn trong src (nếu có)
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Trỏ đúng biến CSS từ Next.js
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      /* ------------------------------------------------------------- */
      /* Typography — hệ 4px/rem theo Design System Specs              */
      /* ------------------------------------------------------------- */
      fontSize: {
        caption: ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }], // 12px
        'body-sm': ['0.8125rem', { lineHeight: '1.25rem', fontWeight: '400' }], // 13px
        'body-md': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '600' }], // 14px, semibold
        'body-sb': ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }], // 16px, semibold
        title: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '700' }], // 18px, bold
        heading: ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }], // 24px, bold
      },

      /* ------------------------------------------------------------- */
      /* Border radius                                                 */
      /* ------------------------------------------------------------- */
      borderRadius: {
        sm: '0.375rem', // var(--radius-sm) — 6px
        md: '0.5rem', // var(--radius-md) — 8px
        lg: '0.75rem', // var(--radius-lg) — 12px
        xl: '1rem', // var(--radius-xl) — 16px
      },

      /* ------------------------------------------------------------- */
      /* Colors — Sci-Fi Dark Mode Design Tokens                       */
      /* ------------------------------------------------------------- */
      colors: {
        // Base background
        'bg-default': '#080C15',

        // Surfaces
        surface: {
          base: 'rgba(17,71,159,0.10)', // subtle panel / card fill
          input: 'rgba(20,29,48,0.50)', // form fields
          elevated: '#0D1420', // dropdowns, popovers, modals
          disabled: 'rgba(20,29,48,0.25)', // disabled controls
        },

        // Borders
        border: {
          subtle: '#1E2B45',
          focus: '#559AEF',
          hover: '#2E4166',
        },

        // Text
        text: {
          DEFAULT: '#F1F5F9',
          primary: '#F1F5F9',
        },

        // Primary accent
        primary: {
          DEFAULT: '#1F70D3',
          hover: '#1757A6',
          light: '#559AEF', // bright accent — icons, links, focus rings
        },

        // Status — Danger
        danger: {
          DEFAULT: '#AA2929',
          hover: '#882020',
          light: '#EE4A4A', // bright — text/icon/border on dark surfaces
        },

        // Status — Warning
        warning: {
          DEFAULT: '#C57110',
          hover: '#9C5A0D',
          light: '#F59E0B',
        },

        // Status — Safe
        safe: {
          DEFAULT: '#15803D',
          hover: '#116530',
          light: '#22C55E',
        },
      },

      boxShadow: {
        'glow-primary': '0 0 1rem rgba(85,154,239,0.35)',
        'glow-safe': '0 0 0.75rem rgba(34,197,94,0.45)',
        popover: '0 0.5rem 1.5rem rgba(0,0,0,0.4)',
      },

      backdropBlur: {
        header: '12px',
      },
    },
  },
  plugins: [],
};