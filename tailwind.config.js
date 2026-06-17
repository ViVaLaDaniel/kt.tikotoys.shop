/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream-bg': '#FCF9F2',       // Fairytale Cream Background
        'cocoa-dark': '#3D261C',     // Dark Cocoa Text
        'cocoa-light': '#8D5B4C',    // Light Cocoa Text
        'pastel-pink': '#FFB7B2',    // Magic Pastel Pink
        'pastel-lavender': '#E8AEB7',// Magical Lavender
        'pastel-sand': '#E2CFC4',    // Cozy Soft Sand
        
        // Aliases for layout compatibility
        'brown-dark': '#3D261C',
        'brown-light': '#8D5B4C',
        'sand': '#FFB7B2',           // Primary action defaults to Pastel Pink
        'salmon': '#E8AEB7',         // Accents defaults to Lavender
        'moccasin': '#E2CFC4',       // Highlights defaults to Sand
      }
    },
  },
  plugins: [],
}
