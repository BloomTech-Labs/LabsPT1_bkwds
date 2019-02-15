import { css } from "styled-components"

// MEDIA TEMPLATES
const breakpoints = {
  desktop: 1024,
  tablet: 768,
  phone: 576
}

const minBreakpoints = {
  tablet: 577,
  desktop: 769
}

/* You can use the media export in a styled-component like so:
 *   ${media.desktop`display: flex;`}
 *   ${media.tablet`display: inline-block;`}
 *   ${media.phone`display: none;`} */
export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label] / 16}em) {
      ${css(...args)};
    }
  `
  return acc
}, {})

export const minMedia = Object.keys(minBreakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label] / 16}em) {
      ${css(...args)};
    }
  `
  return acc
}, {})

// This mixin only works if you put the .error div *before* the input,
// as the .error div selects its next sibling to apply border colors
export const validationErrorMixin = css`
  .error + input {
    /* Color input red when adjacent to an error: */
    border: 1px solid #cea0a5;
  }
`

export const authFormErrorsMixin = css`
  .form-field {
    ${validationErrorMixin};
    /* Mixin overrides: */
    .error {
      display: block;
      padding: 5px 8px;
      height: 30px;
      background: #ffdce0;
      border-radius: 3px;
      border: 1px solid #cea0a5;
      color: #86181d;
      font-size: 0.75rem;
      z-index: 10;
    }
    .client-error {
      margin: 35px 0 0 5px;
      position: absolute;
    }
    .client-error:after,
    .client-error:before {
      bottom: 100%;
      left: 15%;
      border: solid transparent;
      content: "";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    .client-error:after {
      border-color: rgba(255, 220, 224, 0);
      border-bottom-color: #ffdce0;
      border-width: 6px;
      margin-left: -6px;
    }
    .client-error:before {
      border-color: rgba(206, 160, 165, 0);
      border-bottom-color: #cea0a5;
      border-width: 7px;
      margin-left: -7px;
    }
    .server-error {
      margin-top: 16px;
    }
  }
  .spinner {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
  }
`

// General styles that you can spread around:
export const flexCenterMixin = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const boxShadowMixin = css`
  box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.1);
`

export const modalBlur = css`
  filter: blur(1px);
`

// Wrote these in anticipation of a card component
export const card = css`
  background: ${props => props.theme.primary};
  box-shadow: ${props => props.theme.boxShadow};
`

export const fontDeclarations = css`
  @font-face {
    font-family: "Wals";
    src: local("Wals Regular"), local("Wals-Regular"),
      url("/fonts/Wals-Regular.otf") format("opentype");
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
  }
  @font-face {
    font-family: "Wals";
    src: local("Wals Regular Oblique"), local("Wals-Regular-Oblique"),
      url("/fonts/Wals-Regular-Oblique.otf") format("opentype");
    font-weight: 400;
    font-style: italic;
    font-display: fallback;
  }
  @font-face {
    font-family: "Wals";
    src: local("Wals Light"), local("Wals-Light"),
      url("/fonts/Wals-Light.otf") format("opentype");
    font-weight: 300;
    font-style: normal;
    font-display: fallback;
  }
  @font-face {
    font-family: "Wals";
    src: local("Wals Light Oblique"), local("Wals-Light-Oblique"),
      url("/fonts/Wals-Light-Oblique.otf") format("opentype");
    font-weight: 300;
    font-style: italic;
    font-display: fallback;
  }
  @font-face {
    font-family: "Wals";
    src: local("Wals Medium"), local("Wals-Medium"),
      url("/fonts/Wals-Medium.otf") format("opentype");
    font-weight: 500;
    font-style: normal;
    font-display: fallback;
  }
  @font-face {
    font-family: "Wals";
    src: local("Wals Medium Oblique"), local("Wals-Medium-Oblique"),
      url("/fonts/Wals-Medium-Oblique.otf") format("opentype");
    font-weight: 500;
    font-style: italic;
    font-display: fallback;
  }
`

export const fontMixin = css`
  html * {
    font-family: Wals, sans-serif;
    /* @SET: 1rem === 16px */
    font-size: 16px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  h1 {
    font-size: 3rem;
    font-weight: 400;
    color: ${props => props.theme.primary};
  }

  h2 {
    font-size: 2.75rem;
    font-weight: 500;
  }

  h3 {
    font-size: 2.5rem;
    letter-spacing: 0.01875rem;
  }

  h4 {
    font-family: Wals, sans-serif;
    font-weight: 500;
    font-size: 1.75rem;
    margin-bottom: 16px;
  }
`
