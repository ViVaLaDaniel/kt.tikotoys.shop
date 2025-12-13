/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream-bg': '#FFF5E1',      // Background
        'brown-dark': '#5C4033',   // Main text
        'brown-light': '#A0522D',  // Secondary text
        'sand': '#F4A460',         // Primary action color
        'salmon': '#E9967A',       // Accent and links
        'moccasin': '#FFE4B5',     // Highlights and hover
      }
    },
  },
  plugins: [],
}
