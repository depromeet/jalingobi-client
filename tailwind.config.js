const plugin = require('tailwindcss/plugin');

const color = require('./styles/tailwind/color');
const typography = require('./styles/tailwind/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      },
      colors: { ...color },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({ ...typography });
    }),
  ],
};
