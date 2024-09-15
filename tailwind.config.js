/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Looks for classes in all JS/JSX/TS/TSX files inside the src folder
  ],
  theme: {
    extend: {}, // You can extend the default Tailwind theme here if needed
  },
  plugins: [], // Add Tailwind plugins here if needed (optional)
}
