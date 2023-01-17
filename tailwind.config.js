const typography = require("@tailwindcss/typography")

// Screen sizes
const mobile = "450px"
const laptop = "1024px"
const desktop = "1280px"

module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      width: {
        laptop,
        mobile
      },
      maxWidth: {
        laptop,
        mobile
      }
    },
    screens: {
      mobile: {
        max: mobile
      },
      laptop: {
        max: laptop
      },
      desktop: {
        max: desktop
      }
    }
  },
  plugins: [
    typography
  ]
}
