import { createGlobalStyle } from "styled-components"
import { fontDeclarations, fontMixin } from "./mixins"

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ${fontDeclarations};
  ${fontMixin};

  /* Bootstrap Overrides */
  ol,
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  a {
    color: ${props => props.theme.primaryDark};
    &:hover {
      text-decoration: none;
    }
  }

  background: ${props => props.theme.contentBackground};
  height: 100vh;
  overflow: hidden;

  .main-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* margin-top: ${props => "-" + props.theme.navHeight}; */
  }
  .main-wrapper-auth {
    background: ${props => props.theme.contentBackground}
  }

  .main-content {
    display: flex;
    height: 100%;
  }
  .main-content.with-sidebar {
  }

  span.form-error {
    font-size: 12px;
    color: ${props => props.theme.secondaryDark};
  }
`
