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
      url("/fonts/Calibre-Regular.otf") format("opentype");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Calibre";
    src: local("Calibre Regular Italic"), local("Calibre-Regular-Italic"),
      url("/fonts/Calibre-RegularItalic.otf") format("opentype");
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: "Calibre";
    src: local("Calibre Light"), local("Calibre-Light"),
      url("/fonts/Calibre-Light.otf") format("opentype");
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: "Calibre";
    src: local("Calibre Light Italic"), local("Calibre-Light-Italic"),
      url("/fonts/Calibre-LightItalic.otf") format("opentype");
    font-weight: 200;
    font-style: italic;
  }
  @font-face {
    font-family: "Calibre";
    src: local("Calibre Medium"), local("Calibre-Medium"),
      url("/fonts/Calibre-Medium.otf") format("opentype");
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: "Calibre";
    src: local("Calibre Medium Italic"), local("Calibre-Medium-Italic"),
      url("/fonts/Calibre-MediumItalic.otf") format("opentype");
    font-weight: 600;
    font-style: italic;
  }

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
