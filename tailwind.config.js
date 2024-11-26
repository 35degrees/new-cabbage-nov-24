/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    screens: {
      sm: "375px",
      md: "767px",
      lg: "1400px",
    },
    extend: {
      fontFamily: {
        classic: ["Libre Baskerville", "sans-serif"],
        fun: ["Parkinsans", "sans-serif"],
      },
      colors: {
        rose500: "hsl(12, 20%, 44%)",
        rose400: "hsl(7, 20%, 60%)",
        rose300: "hsl(14, 25%, 72%)",
      },
    },
  },

  plugins: [],
};
