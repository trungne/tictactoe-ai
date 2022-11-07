/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        honeydew: "#D9E5D6",
        crayola: "#00A7E1",
        champagne: "#EDDEA4",
        tangerine: "#F7A072",
        saffron: "#FF9B42"
      }
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
}