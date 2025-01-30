/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontSize: {
        'custom-16': '18px',
        'list-items-16':'16px',
      },
    },
  },
  plugins: [],
}

