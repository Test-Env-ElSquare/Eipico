/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix:"tw-",
  content: [ "./src/**/*.{html,ts}",],
  theme: {
    extend: {
      width:{
        '12%':'12%',
        '30rem':'30rem'
      },
      spacing:{
        '15.8':'15.8rem',
        '11.8':'11.8rem',
        '9.8':'9.8rem',
        '17':'17rem',
        '13.5':'13.5rem',
        '80px':'80px',
        '60px':'60px'
      },
      colors:{
        'searchBtn':'#6571ff',
        'btnDelete':'#ff3366'
      }
    },
  },
  plugins: [],
}

