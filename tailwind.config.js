/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "dark-grey": "#222222",
        "light-grey": "#303030",
        "background-grey": "#141414",
      },
      gridTemplateRows: {
        "equal-spacing": "repeat(3, 160px)",
      },
    },
  },
  plugins: [],
};
