/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Ensure Tailwind processes your Angular HTML and TypeScript files
  ],
  theme: {
    extend: {
      keyframes: {
        popup: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.1)', opacity: 0.9 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        popup: 'popup 0.8s ease-in-out',
      },
    },
  },
  plugins: [],
};
