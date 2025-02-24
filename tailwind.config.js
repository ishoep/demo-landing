/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-delay': 'fadeIn 0.5s ease-out 0.2s',
        'fade-in-delay-2': 'fadeIn 0.5s ease-out 0.4s',
      },
    },
  },
  plugins: [],
};