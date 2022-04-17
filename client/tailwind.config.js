module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : '#7532FA',
        mainBackground : '#1C1F23',
        secondary : '#19171D',
        iconBg : '#3b4047',
        dashboardCountIcon : '#ECEBED',
        headingBackground : '#E5E5FF',
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