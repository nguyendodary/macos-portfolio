/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sf: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Helvetica Neue', 'sans-serif'],
      },
      animation: {
        'bounce-dock': 'bounce-dock 0.6s ease-in-out',
      },
      keyframes: {
        'bounce-dock': {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(-5px)' },
          '75%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
