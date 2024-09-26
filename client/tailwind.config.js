module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '2px 4px 101px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        "dark-purple": "#081A51",
        "bugrits": "linear-gradient(90deg, #8F00FF, #0066FF",
        "light-white": "rgba(255,255,255,0.17)",
        'custom-gradient': 'linear-gradient(90deg, #8F00FF, #0066FF)',
      },
     
    },
  },
  plugins: [],
};