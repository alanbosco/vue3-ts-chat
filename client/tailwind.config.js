/* eslint-env node */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': {
          100: '#1f2029',
          200: '#17181f'
        },
        primary: '#0158da'
      }
    }
  },
  plugins: []
}
