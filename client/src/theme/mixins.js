import { css } from "styled-components"

// MEDIA TEMPLATES
const breakpoints = {
  desktop: 1024,
  tablet: 768, // good
  phone: 576
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
  }
  @font-face {
    font-family: "Wals";
    src: local("Wals Regular Oblique"), local("Wals-Regular-Oblique"),
      url("/fonts/Wals-Regular-Oblique.otf") format("opentype");
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: "Wals";
    src: local("Wals Light"), local("Wals-Light"),
      url("/fonts/Wals-Light.otf") format("opentype");
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: "Wals";
    src: local("Wals Light Oblique"), local("Wals-Light-Oblique"),
      url("/fonts/Wals-Light-Oblique.otf") format("opentype");
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: "Wals";
    src: local("Wals Medium"), local("Wals-Medium"),
      url("/fonts/Wals-Medium.otf") format("opentype");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: "Wals";
    src: local("Wals Medium Oblique"), local("Wals-Medium-Oblique"),
      url("/fonts/Wals-Medium-Oblique.otf") format("opentype");
    font-weight: 500;
    font-style: italic;
  }
`

export const fontMixin = css`
  html * {
    font-family: Wals;
    /* setting 1rem to ===  16px */
    font-size: 16px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  h1 {
    font-size: 3rem;
    font-weight: 400;
    color: ${props => props.theme.primary};
  }

  h3 {
    font-size: 2.5rem;
    letter-spacing: 0.01875rem;
  }
`
