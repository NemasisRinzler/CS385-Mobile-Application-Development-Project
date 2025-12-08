module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3fbf4',
          100: '#e8f9ea',
          300: '#7dd08a',
          500: '#22c55e',
          700: '#15803d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
      }
    }
  },
  plugins: []
};