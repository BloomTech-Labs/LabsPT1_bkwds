import { createGlobalStyle } from "styled-components"
import { fontDeclarations, fontMixin } from "./mixins"

export const GlobalStyles = createGlobalStyle`
  ${fontDeclarations};
  html, body {
    overflow: hidden;
    height: 100vh;
  }

  html {
    background: ${props => props.theme.contentBackground};
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ${fontMixin};

  /* Bootstrap Overrides */
  ol,
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  a {
    will-change: color;
    -webkit-transition: color 0.15s ease;
    transition: color 0.15s ease;

    color: ${props => props.theme.linkColor};
    &:hover {
      color: ${props => props.theme.linkColorHover};
      text-decoration: none;
    }
  }

  button:focus, input:focus, textarea:focus {
    outline: 0;
  }

  button:hover {
    text-decoration: none;
  }

  .main-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* margin-top: ${props => "-" + props.theme.navHeight}; */
  }
  .main-wrapper-auth {
    background: ${props => props.theme.contentBackground};
  }

  .main-content {
    display: flex;
    height: 100%;
  }

  span.form-error {
    font-size: 12px;
    color: ${props => props.theme.secondaryDark};
  }

  button.btn-ghost, a.btn-ghost, button.ghost-btn, a.ghost-btn {
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.white};
    color: ${props => props.theme.black};
    border: 0;
    display: inline-block;
    /* padding: 0.75rem 1.5rem 0.8125rem; */
    padding: 0.75rem 1.5rem;
    min-width: 14rem;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: 500;
    /* line-height: 1.3; */
    text-align: center;
    -webkit-box-shadow: 0 0.3125rem 0.9375rem 0 rgba(0,0,0,.05), 0 0 0 0.0625rem rgba(0,0,0,.03), 0 0.0625rem 0 0 rgba(0,0,0,.05), 0 0.0625rem 0.1875rem 0 rgba(0,0,0,.01);
    box-shadow: 0 0.3125rem 0.9375rem 0 rgba(0,0,0,.05), 0 0 0 0.0625rem rgba(0,0,0,.03), 0 0.0625rem 0 0 rgba(0,0,0,.05), 0 0.0625rem 0.1875rem 0 rgba(0,0,0,.01);
    -webkit-transition: background-color .15s ease-out,color .15s ease-out,-webkit-box-shadow .15s ease-out;
    transition: background-color .15s ease-out,color .15s ease-out,-webkit-box-shadow .15s ease-out;
    &:hover, &:focus {
      background-color: ${props => props.theme.white};
      border-color: ${props => props.theme.white};
      color: #526699;
      -webkit-box-shadow: 0 0.3125rem 0.9375rem 0 rgba(0,0,0,.05), 0 0 0 0.0625rem rgba(0,0,0,.03), 0 0.125rem 0.0625rem 0 rgba(0,0,0,.1), 0 0.0625rem 0.1875rem 0 rgba(0,0,0,.01);
      box-shadow: 0 0.3125rem 0.9375rem 0 rgba(0,0,0,.05), 0 0 0 0.0625rem rgba(0,0,0,.03), 0 0.125rem 0.0625rem 0 rgba(0,0,0,.1), 0 0.0625rem 0.1875rem 0 rgba(0,0,0,.01);
    }
    &:focus {
      outline: 0;
    }
  }
`
