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
      Inter: ['inter, sans-serif'],
    },
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px'
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
