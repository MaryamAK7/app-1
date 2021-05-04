module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gr: "#133d13",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
