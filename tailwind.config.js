module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // 'media' or 'class'
  theme: {
    extend: {
      animation: {
        pulse: "pulse 2s infinite",
      },
      keyframes: {
        pulse: {
          "0%": {
            transform: "scale(0.8)",
            boxShadow: "0 0 0 0 rgba(229, 62, 62, 1)",
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 60px rgba(229, 62, 62, 0)",
          },
          "100%": {
            transform: "scale(0.8)",
          },
        },
      },
      colors: {
        "gray-dark": "#1d1d1d",
        yellow: "#fec303",
        yellow_opacity: "rgba(254, 195, 3, 0.2)",
        red: "rgb(255,0,0)",
        danger: "#d32f2f",
        information: "#0288d1",
        success: "#388E3C",
        black: "#161616",
        green: "#00a67e",
      },
      minHeight: {
        section: "calc(100vh - 216px)",
        20: "120px",
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
