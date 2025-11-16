/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        card: "#E5E5E5",
        primary: "#1ABC9C",
        secondary: "#E67E22",
        positive: "#2ECC71",
        warning: "#E74C3C",
        textPrimary: "#333333",
        textSecondary: "#555555",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        lg: "12px",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
  plugins: [],
};
