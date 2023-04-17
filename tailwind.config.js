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
        bgLightGray: "#cfe2f3",
        bgOffWhite: "#F0F2F5",
        txtDarkGray: "#333333",
        txtDarkerGray: "#222222",
        txtLightGray: "#777777",
        txtDarkerLightGray: "#999999",
        txtLighterGray: "#bbb",
        pink: "#ff4444",
        orange: "#FF5733",
        salmon: "#FF6F61",
        skyBlue: "#7FB3D5",
        brightBlue: "#3399FF",
        turquoise: "#66CCCC",
      },
      backgroundSize: {
        150: "150%",
        200: "200%",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwind-scrollbar-hide")],
};
