/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'
import flowbite from 'flowbite/plugin'
export default {

  content: [
    './components/**/*.{html,js}',
    './pages/**/*.{html,js}',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  

  ],
  theme: {
    extend: {

      colors: {
        kunjappan: "#2596be"
      },


    },
  },
  darkMode: "class",
 
  plugins: [
    daisyui,
    flowbite
   

  ],
  daisyui: {
    darkTheme: "light"
  },
  flowbite:{
    darkTheme:"light"
  }
}

