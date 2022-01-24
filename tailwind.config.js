module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      exo2: ['"Exo 2"', "sans-serif"],
      metro: ["Metrophobic", "sans-serif"],
      hind: ["Hind", "sans-serif"],
    },
    extend: {
      colors: {
        background: "#F5F1F0",
        primary: {
          salmon: "#FF7E82",
          green: "#7FD1AE",
          mpago: "#74b9d9",
          mpago700: "#008ad6",
        },
        text: "#3B3837",
        secondText: "#cabea3",
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};
