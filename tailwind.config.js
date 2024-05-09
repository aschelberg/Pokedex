/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'scores-primary': '#000000',
        'scores-secondary': '#000000',
        'button-primary': '#5D3FD3',
      },
    },
    fontFamily: {
      Inter: ['Inter, sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
    },
  },
  plugins: [],
}
