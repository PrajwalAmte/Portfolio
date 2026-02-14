/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Orbitron', 'Rajdhani', 'Exo 2', 'sans-serif'],
        body: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Roboto Mono', 'monospace'],
      },
      colors: {
        border: 'var(--border-subtle)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        rotate: 'rotate 20s linear infinite',
        fadeIn: 'fadeIn 0.6s ease-out',
        slideInFromRight: 'slideInFromRight 0.8s ease-out',
      },
    },
  },
  plugins: [],
};
