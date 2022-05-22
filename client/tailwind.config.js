module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : 'class',
  theme: {
    extend: {
      colors: {
        primary : '#7532FA',
        mainBackground : '#EFEFFF',
        iconBg : '#9350FF',
        dashboardCountIcon : '#ECEBED',
        headingBackground : '#E5E5FF',
        darkBg : '#121212',
        darkSurface : '#000000',
        darkSecondary : '#03DAC6',
        darkPrimary : '#BB86FC',
        darkExtra : '#6200EE',
        darkWhite : '#fffffff',
        darkSecondaryVariant : '#018786',
        darkElevation : {
          50 : '#121212',
          100 : '#1E1E1E',
          200 : '#222222',
          300 : '#242424',
          400 : '#272727',
          500 : '#2C2C2C',
          600 : '#2D2D2D',
          700 : '#333333',
          800 : '#353535',
          900 : '#383838',

        },
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
      },
      fontFamily : {
        poppins : ['Poppins', 'sans-serif']
      },
      spacing: {
        '18' : '4.5rem'
      }
    },
  },
  plugins: [],
}