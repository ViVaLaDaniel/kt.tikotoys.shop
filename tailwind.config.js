/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream-bg': '#FAF6EE',       // Fairytale Soft Cream
        'cocoa-dark': '#3A261A',     // Deep Cocoa Text
        'cocoa-light': '#805B46',    // Warm Caramel-Cocoa Text
        'pastel-pink': '#FFC4C0',    // Soft Blush Pink
        'pastel-lavender': '#E2CEE6',// Whimsical Lavender
        'pastel-sand': '#E8D4C8',    // Warm Toy Sand
        'pastel-sage': '#C6D8C3',    // Magical Sage Green
        'pastel-caramel': '#D8A47F', // Cozy Honey Caramel
        
        // Aliases for layout compatibility
        'brown-dark': '#3A261A',
        'brown-light': '#805B46',
        'sand': '#D8A47F',           // Primary action is now Cozy Honey Caramel
        'salmon': '#FFC4C0',         // Accent highlight is Blush Pink
        'moccasin': '#C6D8C3',       // Secondary highlights are Sage Green
      }
    },
  },
  plugins: [],
}
