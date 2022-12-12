module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "gray-dark": "#1d1d1d",
        yellow: "#fec303",
        red: "rgb(255,0,0)",
      },
      minHeight: {
        section: "calc(100vh - 216px)",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.20rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "3.5xl": "2.25rem",
        "4xl": "2.5rem",
        "5xl": "3.3125rem",
        "6xl": "4rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
