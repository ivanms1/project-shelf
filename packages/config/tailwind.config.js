/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#4640DE',
      },
    },
  },
  content: ['../../packages/ui/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
};
