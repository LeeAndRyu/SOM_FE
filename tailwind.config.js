/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      'retro',
      'cupcake',
      'light',
      'autumn',
      'aqua',
      'valentine',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
