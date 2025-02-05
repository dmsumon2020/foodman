/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        footerBg : "url('/src/assets/footerbg.jpg')",
    },
      colors: {
        sectionBgColor: '#F3EFE5',
        DarkModeSectionBgColor: '#272F3C',
        DarkModeBg: '#1F2937',
        primaryColor: '#c79c60',
        primaryColorHover: '#b08446',
      },
      fontFamily: {
        headingFont: ['Cormorant Garamond', 'sans-serif'],
        subheadingFont: ['Great Vibes', 'serif'],
      }
    },
  },
  plugins: [],
}