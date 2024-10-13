/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        earth: '#8B4513',
        leaf: '#4CAF50',
        sand: '#F4A460',
        stone: '#708090',
        wood: '#D2691E',
        zen: '#F5F5DC',
      },
    },
  },
  plugins: [],
}