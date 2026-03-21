/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'mission': '0px 0px 2px 3px rgba(1000,1000,1000,0.3)',
      },
      keyframes: {
        bottomtop: {
          '0%': { transform: 'translatex(100%)' },
          '100%': { transform: 'translatex(0%)' }
        }
      },
      animation: {
        bottomtop: 'bottomtop 2s linear infinite',
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('not-empty', '&:not(:placeholder-shown)');
    }),
  ],
}
