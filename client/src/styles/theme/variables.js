// * Root Colors ----------------------
const themeColor = localStorage.getItem("themeColor")
const transparent = "rgba(0, 0, 0, 0)"

const white = "#fff"
const offWhite = "#f0f0f0"
const ghostWhite = "#f5f5fa" // light light blue
const lightGray = "#bababa"
const midGray = "#646565"
const darkGray = "#333333"
const offBlack = "#222222"
const black = "rgb(32, 34, 51)"

const primary = themeColor || "rgba(244, 105, 4, 1)"
// const primaryHover = "rgba(244, 105, 4, 0.8)"
const primaryHover = "#f9873b"
const primaryLight = "#facbb1"
const primaryDark = "#e4580d"
const secondary = midGray
const secondaryDark = darkGray
const tertiary = "rgba(0, 90, 132, 1)"
const tertiaryHover = "rgba(0, 90, 132, 0.8)"
const tertiaryLight = "#899ac6"

const linkColor = primaryDark
const linkColorHover = "#526699"
// const linkColorHover = "#1e306e"

export const theme = {
  // * Misc. -----------------------------------
  boxShadow: "0 2px 16px 1px rgba(0, 0, 0, 0.15)",

  // * Default Dimensions ----------------------
  sidebarWidth: 215,
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
  primaryHover,
  secondary,
  tertiary,
  tertiaryHover,
  primaryDark,
  secondaryDark,
  tertiaryLight,
  primaryLight,

  linkColor,
  linkColorHover,

  transparent,
  white,
  offWhite,
  ghostWhite,
  lightGray,
  midGray,
  darkGray,
  offBlack,
  black,

  contentBackground: ghostWhite,
  textColorDark: white,
  inputError: secondaryDark,
  menuBg: offWhite,
  // activeItem: tertiaryLight,
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
