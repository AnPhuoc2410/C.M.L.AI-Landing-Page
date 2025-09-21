/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'marx-red': '#FF3B3B',
        'marx-black': '#0A0A0A',
        'marx-white': '#F5F5F5',
        'marx-gold': '#d4af37',
        'ai-blue': '#00d0ff',
        'ai-purple': '#7b61ff'
      },
    },
  },
  plugins: [],
}

