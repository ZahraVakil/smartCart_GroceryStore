/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/components/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#2C7865',
      },
    },
  },
  plugins: [],
}

