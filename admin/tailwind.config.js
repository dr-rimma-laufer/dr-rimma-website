/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f3',
          100: '#fce8e6',
          200: '#f9d5d1',
          300: '#f4b5ad',
          400: '#ec8b7e',
          500: '#e06455',
          600: '#c9493a',
          700: '#a93a2d',
          800: '#8c3329',
          900: '#753028',
          950: '#3f1510',
        },
        gold: {
          50: '#fdfaed',
          100: '#f8f0cc',
          200: '#f1df94',
          300: '#e9c95c',
          400: '#e3b536',
          500: '#d99b21',
          600: '#c0781a',
          700: '#a05718',
          800: '#83451b',
          900: '#6c3a19',
          950: '#3e1d0a',
        },
      },
      fontFamily: {
        sans: ['Heebo', 'sans-serif'],
        serif: ['David Libre', 'serif'],
      },
    },
  },
  plugins: [],
  // RTL support
  corePlugins: {
    preflight: true,
  },
};
