/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Playfair Display', 'Georgia', 'serif'],
        'script': ['Crimson Text', 'Georgia', 'serif'],
      },
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b2a3',
          400: '#7a8f7a',
          500: '#5d735d',
          600: '#4a5c4a',
          700: '#3d4a3d',
          800: '#333d33',
          900: '#2b332b',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        amber: {
          500: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
};
