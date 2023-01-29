const typography = require("@tailwindcss/typography")

// Screen sizes
const mobile = "450px"
const laptop = "1024px"
const desktop = "1280px"
const xsm = mobile
const sm = "640px"
const md = "768px"
const lg = laptop
const xl = desktop
const xl2 = "1536px"

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
      mobile,
      laptop,
      desktop,
      xsm,
      sm,
      md,
      lg,
      xl,
      "2xl": xl2
    }
  },
  plugins: [
    typography
  ]
}
