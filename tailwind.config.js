/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    borderWidth: {
      DEFAULT: "0.5px",
    },
    extend: {
      colors: {
        "dark-grey": "#222222",
        "hover-grey": "#303030",
        "background-grey": "#141414",
        "light-grey": "#DFDFDF",
      },
      gridTemplateRows: {
        "equal-spacing": "repeat(3, 160px)",
      },
      opacity: {
        light: ".11",
      },
    },
  },
  plugins: [],
};
