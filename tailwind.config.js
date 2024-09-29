/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      // sm: { max: '767px' },
      md: { max: '975px' },
      lg: { min: '976px', max: '1439px' },
      xl: { min: '1440px' }
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

      // fontFamily: {
      //   sans: ['Roboto', 'sans-serif']
      // }
    }
  },
  plugins: []
}
