/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');

const color = require('./src/styles/tailwind/color');
const typography = require('./src/styles/tailwind/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
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
