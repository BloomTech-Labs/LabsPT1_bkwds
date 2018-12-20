import { createGlobalStyle } from "styled-components"
import { fontDeclarations, fontMixin } from "./mixins"

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
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
  .main-wrapper.with-sidebar {

  }
  .main-content {
    display: flex;
    height: 100%;
  }

  span.form-error {
    font-size: 12px;
    color: ${props => props.theme.secondaryDark};
  }
`
