/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0b1f4d',
      },
      fontFamily: {
        castoro: ['Castoro', 'Georgia', 'serif'],
        playfair: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

