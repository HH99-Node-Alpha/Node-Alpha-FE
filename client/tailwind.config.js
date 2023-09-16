/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        transform: "transform",
        opacity: "opacity",
        visibility: "visibility",
      },
    },
  },
  plugins: [],
};
