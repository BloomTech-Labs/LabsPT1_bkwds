// * Root Colors ----------------------
const themeColor = localStorage.getItem("themeColor")
const transparent = "rgba(0, 0, 0, 0)"
const white = "#fff"
const offWhite = "#f5f5f5" // royal blue
const ghostWhite = "#ebf5fb" // light light blue
const lighterGray = "#f6f6f6"
const lightGray = "#505050"
const midGray = "#525252" // body text
const offBlack = "rgb(62, 62, 62)"
const black = "rgb(32, 34, 51)"

// const primaryLight = "#526699"
const primary = themeColor || "#1e306e"
const primaryLight = "#a5cde9"
const primaryDark = "#05267c"
const secondary = "#f66"
const secondaryDark = "#ea554b"
const tertiary = ""
const tertiaryDark = ""

export const theme = {
  // * Misc. -----------------------------------
  boxShadow: "0 2px 16px 1px rgba(0, 0, 0, 0.15)",

  // * Default Dimensions ----------------------
  sidebarWidth: 265,
  navHeight: "3.125rem",

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
  // btnDarkBorderColor: primaryExtraDark,

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
  primaryLight,
  transparent,
  white,
  offWhite,
  ghostWhite,
  lightGray,
  lighterGray,
  midGray,
  offBlack,
  black,

  contentBackground: ghostWhite,
  textColorDark: white,
  inputError: secondaryDark,
  menuBg: offWhite,
  // activeItem: tertiaryDark,
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
  lightTextOnDark: lightGray,
  // Headers
  h1: 2.4
}

// const white = "#fff"
// const offWhite = "#fff4e7"
// const ghostWhite = "#f6f8fb"
// const lightGray = "rgba(23,42,58,0.25)"
// const midGray = "rgba(46, 49, 72, 0.75)"
// const offBlack = "rgb(62, 62, 62)"
// const black = "rgb(32, 34, 51)"

// const primary = themeColor || "#64a666"
// const primaryDark = "#326956"
// const primaryExtraDark = "#032f1f"
// const secondary = "#df6853"
// const secondaryDark = "#be2322"
// const tertiary = "#e0a66d"
// const tertiaryDark = "#ca825c"