const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        nerdearla: {
          50: '#32d7d3',
          100: '#28cdc9',
          200: '#1ec3bf',
          300: '#14b9b5',
          400: '#0aafab',
          500: '#00a5a1',
          600: '#009b97',
          700: '#00918d',
          800: '#008783',
          900: '#007d79',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
