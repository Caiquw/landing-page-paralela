/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-red': '#C1121F',
        'brand-red-dark': '#8E0F18',
        'brand-yellow': '#F4D35E',
        'brand-dark': '#0B0F14',
        'brand-gray': '#F2F3F5',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'system-ui', 'sans-serif'],
        heading: ['Oswald', 'system-ui', 'sans-serif'],
        body: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
}

