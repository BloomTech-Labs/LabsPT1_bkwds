import { css } from "styled-components"

export const flexCenterMixin = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const containerMixin = css`
  display: flex;
  /* flex-grow: 2; */
`

export const modalBlur = css`
  filter: blur(1px);
`

export const card = css`
  background: ${props => props.theme.primary};
  box-shadow: ${props => props.theme.boxShadow};
`

export const boxShadowMixin = css`
  box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.1);
`

export const animations = css`
  /* -webkit-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out; */
`

export const fontDeclarations = css`
  @font-face {
    font-family: "Calibre";
    src: local("Calibre Regular"), local("Calibre-Regular"),
      url("/fonts/Calibre-Regular.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Calibre";
    src: local("Calibre Light"), local("Calibre-Light"),
      url("/fonts/Calibre-Light.woff") format("woff");
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: "Calibre";
    src: local("Calibre Medium"), local("Calibre-Medium"),
      url("/fonts/Calibre-Medium.woff") format("woff");
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: "Calibre";
    src: local("Calibre Semibold"), local("Calibre-Semibold"),
      url("/fonts/Calibre-Semibold.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
  }
`

export const fontMixin = css`
  html * {
    font-family: Calibre;
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