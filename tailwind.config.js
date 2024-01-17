/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#01A2E4",
        secondary: "#EAEAFC",
        footer: "#2E3E5C",
      },
    },
  },
  plugins: [],
};