/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'calc-bg': '#0E0F11',
        'calc-card': '#1C1C1C',
        'calc-accent': '#10b981', // emerald-500
      },
    },
  },
  plugins: [],
}
