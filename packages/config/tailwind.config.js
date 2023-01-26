/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#A259FF',
        'primary-dark': '#9240FD',
        'blue-light': '#377DF7',
        black: '#2B2B2B',
        'grey-dark': '#3B3B3B',
        'grey-light': '#858584',
        white: '#FFFFFF',
        'red-light': '#FF6250',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(128.15deg, #A259FF 49.75%, #377DF7 136.56%);',
        'gradient-secondary': 'linear-gradient(100.92deg, #A259FF 13.57%, #FF6250 97.65%);',
      },
      zIndex: {
        'loading-overlay': '999',
        'modal-overlay': '99999',
      }
    },
  },
  content: ['../../packages/ui/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
};
