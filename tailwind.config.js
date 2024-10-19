/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      colors: {
        primary: '#7367f0',
        secondary: '#808390',
        success: '#28c76f',
        danger: '#ff4c51',
        warning: '#ff9f43',
        info: '#00bad1',
        dark: '#d7d8de',
        body: '#25293c',
        darken: '#2d3249',
        fontBase: '#cfcde4',
        cardColor: '#2f3349',
        colorBorder: '#44485e',
        secondaryHover: 'rgba(225, 222, 245, 0.1)',
        modalColor: '#acabc1'
      },
      fontSize: {
        'base-sm': '15px'
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
}
