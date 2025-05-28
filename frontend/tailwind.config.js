/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode via a CSS class
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}