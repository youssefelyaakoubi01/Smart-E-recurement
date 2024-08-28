/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
    
   
  ],
  theme: {
    extend: {
      fontFamily: {
        // add the css variable and include fallback fonts from tailwind default theme
        sans: ['var(--font-sans)', ...fontFamily.sans],
        serif: ['var(--font-serif)', ...fontFamily.serif],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('flowbite/plugin') // add this line
    
  ],
}

