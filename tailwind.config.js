/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        royal: {
          950: '#0A1240', 900: '#0F1E6B', 800: '#162A94', 700: '#1B35B8', 600: '#2447D6',
          500: '#3A5FE8', 200: '#C9D5FF', 100: '#E4EAFF', 50: '#F3F6FF',
        },
        gold: { DEFAULT: '#C9A45C', soft: '#E6CF9C', deep: '#7A5A1E' },
        veg: '#0F8A3D',
        spicy: '#D93025',
        // theme-aware semantic tokens (see styles/tokens.css)
        page: 'rgb(var(--c-page) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        hairline: 'rgb(var(--c-hairline) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--c-accent-soft) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '16px', sheet: '24px' },
      boxShadow: {
        card: '0 1px 2px rgb(15 30 107 / 0.05), 0 6px 20px -8px rgb(15 30 107 / 0.14)',
        lift: '0 2px 4px rgb(15 30 107 / 0.06), 0 18px 40px -12px rgb(15 30 107 / 0.28)',
        sheet: '0 -12px 48px -12px rgb(10 18 64 / 0.35)',
      },
    },
  },
  plugins: [],
};
