/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        zinc: {
          150: '#F2F2F2',
          250: '#D9D9D9',
          350: '#808080',
          450: '#333333',
          550: '#262626',
          650: '#1A1A1A',
          1000: '#0D0D0D',
        },
        red: {
          450: '#E25858',
        },
        blue: {
          350: '#4EA8DE',
          550: '#1E6F9F',
        },
        indigo: {
          450: '#8284FA',
        },
        purpleDark: {
          500: '#5E60CE',
        }
      }
    },
  },
  plugins: [],
}

