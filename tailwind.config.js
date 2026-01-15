const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.md',
    './*.html',
    './_data/*.yml',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3833E3',
          '10': '#24243A',
          '100': '#505050',
          '200': '#E2E8F0',
          '300': '#2C2C2C',
          '400': '#64748B',
          '500': '#3833E3',
          '600': '#374151'
        },
        green: {
          DEFAULT: '#05D68E',
        },
        red: {
          DEFAULT: '#F56C6C',
        },
        blue: {
          DEFAULT: '#1FD1FF',
        },
        orange: {
          DEFAULT: '#FF9700',
        },
        secondary: {
          DEFAULT: '#182BB1',
        },
        yellow: {
          DEFAULT: '#E7F569',
        },

      },
      fontFamily: {
        custom: ["Lexend", 'sans-serif'],
        lexend: ["Lexend", ...defaultTheme.fontFamily.sans],
        
      },

    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ]
}
