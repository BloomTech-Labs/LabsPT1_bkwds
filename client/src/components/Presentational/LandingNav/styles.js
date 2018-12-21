import styled from "styled-components"
import { boxShadowMixin } from "../../../theme/mixins"

export const LandingNavStyles = styled.div`
  background: ${props => props.theme.white};
  min-height: ${props => props.theme.navHeight};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${boxShadowMixin};

  .landing-page-mobile-nav {
    @media all and (min-width: 1024px) {
      display: none;
    }
    position: relative;
    display: flex;
    background: ${props => props.theme.white};
    flex: 1 100%;
    height: 3rem;
  }

  .landing-page-mobile-menu {
    display: flex;
    align-items: center;
    button {
      color: ${props => props.theme.primary};
      border: none;
      padding-right: 0.5rem;
      padding-left: 1rem;
      padding-top: 2px;
      padding-bottom: 0px;
      font-size: 1.125rem;
      font-weight: 400;
      display: flex;
      align-items: center;
      height: 100%;
      cursor: pointer;
    }
  }

  .landing-page-mobile-logo {
    background: ${props => props.theme.primary};
    color: ${props => props.theme.white};
    height: 100%;
    width: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Logo span */
    span {
      letter-spacing: -0.0625rem;
      font-weight: 700;
      font-size: 2rem;
      height: 2rem;
      display: block;
      text-align: center;
      height: 100%;
      margin-left: -3px;
      margin-top: -3px;
    }
  }

  .landing-page-mobile-cta {
    height: 100%;
    /* Chevron icon: */
    span {
      align-self: center;
      fill: currentColor;
      margin-left: 0.375rem;
      margin-top: 0;
    }
  }

  .landing-page-mobile-links {
    position: absolute;
    top: 0;
    right: 0.25rem;
    display: flex;
    align-items: center;
    height: 100%;

    /* ICONS, right side (1024px or less ONLY) */
    a {
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
  }

  /* Translate the B in logo on LandingPage */
  span.translate-letter {
    display: inline-block;
    /* transform: rotateY(180deg); */
    transform: translate(2px, 3px);
  }
`
