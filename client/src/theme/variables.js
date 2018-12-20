// * Root Colors ----------------------
const transparent = "rgba(0, 0, 0, 0)"
const white = "#fff"
const offWhite = "#fff4e7"
const lightWhite = "rgba(255, 255, 255, 0.75)"
const ghostWhite = "#f6f8fb"
const lightGray = "rgba(23,42,58,0.25)"
const midGray = "rgba(46, 49, 72, 0.75)"
// const lighterGray = "rgba(23,42,58,0.1)"
// const darkGray = ""
const offBlack = "rgb(62, 62, 62)"
const black = "rgb(32, 34, 51)"

const themeColor = localStorage.getItem("themeColor")

const primary = themeColor || "#64a666"
const primaryDark = "#326956"
const primaryExtraDark = "#032f1f"
const secondary = "#df6853"
const secondaryDark = "#be2322"
const tertiary = "#e0a66d"
const tertiaryDark = "#ca825c"

export const theme = {
  // * Misc. -----------------------------------
  boxShadow: "0 2px 16px 1px rgba(0, 0, 0, 0.15)",

  // * Default Dimensions ----------------------
  sidebarWidth: 265,
  navHeight: 60,

  // * Buttons ---------------------------------
  // Standard
  btnWidth: 170,
  btnHeight: 47,
  btnBorderRadius: 25,
  btnFontSize: 1.6,
  btnTextColor: white,
  btnBgColor: transparent,
  btnBorderColor: primary,
  // Primary
  btnPrimaryBgColor: primary,
  // Dark Primary
  btnDarkPrimaryBgColor: primaryDark,
  // Dark
  btnDarkBorderColor: primaryExtraDark,

  // * Inputs ----------------------------------
  inputBgColor: white,
  inputTextColor: black,
  inputBorderColor: lightGray,
  placeholderColor: midGray,

  // * Color Theme Variables -------------------
  // Primary Styles
  primary,
  secondary,
  tertiary,
  primaryDark,
  secondaryDark,
  tertiaryDark,
  white,

  contentBackground: ghostWhite,
  textColorDark: white,
  inputError: secondaryDark,
  menuBg: offWhite,
  activeItem: tertiaryDark,
  navTabColor: tertiary,

  // Links
  linkSelectedBg: null,
  linkSelected: null,
  linkHoverBg: null,
  linkHover: null,

  // * Typeface --------------------------------
  // Text
  lineHeight: null,
  primaryText: offBlack,
  lightText: midGray,
  medTextLight: midGray,
  medText: lightWhite,
  lightTextOnDark: lightGray,
  // Headers
  h1: 2.4
}
