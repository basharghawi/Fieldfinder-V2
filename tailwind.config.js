/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#017E10',
        'primary-light': 'rgba(1, 126, 16, 0.4)',
        'primary-light2': '#82b387',
        'primary-red': '#D51A2A',
        'gray-light': '#7F7F7F',
        'gray-text': '#4F4F4F',
        'gray-dark': '#2F2F2F',
        'gray-dark-2': '#1E1E1E',
        'gray-light': '#C9C9C9',
        'bg-1': '#eee',
        'bg-2': '#fbfbfb',
        'bg-3': '#D9D9D9',
        'bg-transparent': 'rgba(238, 238, 238, 0.5)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};
