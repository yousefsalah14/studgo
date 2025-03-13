/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors:{
        main: "#111827", /* gray-900 */
        sec:" #1d4ed8", /* blue-700 */
        textColor: "#ffffff", /* white */
        lightColor:" #f0f3f2"
      }
    },
  },
  plugins: [],
}

