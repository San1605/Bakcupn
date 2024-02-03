/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'sm': '13px', // Change the text size for 'sm' breakpoint to 13px
      },
    },
  },
  plugins: [],
}

