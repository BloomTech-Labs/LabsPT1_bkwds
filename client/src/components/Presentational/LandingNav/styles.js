import styled from "styled-components"
import { boxShadowMixin, media } from "../../../theme/mixins"

export const MobileTopNavStyles = styled.div`
  /* position: relative; */

  background: ${props => props.theme.white};
  height: 0;
  /* min-height: ${props => props.theme.navHeight}; */

  .banner-and-top-nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;

  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .landing-page-mobile-top-nav {
    /* ${media.desktop`height: 5.625rem`}; */
    @media all and (min-width: 1024px) {
      display: none;
    }

    ${boxShadowMixin};
    position: relative;
    display: flex;
    background: ${props => props.theme.white};
    flex: 1 100%;
    height: 3rem;
  }

  .open-drawer {
    transition: transform .25s ease-in-out,-webkit-transform .25s ease-in-out;
    will-change: transform;
  }
  .close-drawer {
    transform: translateY(calc(-70px - 0px));
    transition: transform 0.25s ease-in-out;
  }

  /* .landing-page-mobile-top-nav.open-drawer {
    transition: transform .25s ease-in-out,-webkit-transform .25s ease-in-out;
    will-change: transform;
  }
  .landing-page-mobile-top-nav.close-drawer {
    transform: translateY(calc(-70px - 0px));
    transition: transform 0.25s ease-in-out;
  } */

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

export const MobileBottomNavStyles = styled.div`
  .mobile-bottom-nav {
    ${media.desktop`height: 5.625rem`};
    ${media.tablet`height: 2.75rem`};
    top: 108px;
    ${media.tablet`top: 118px`};

    position: fixed;
    left: 0;
    right: 0;

    background: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .mobile-bottom-nav-left {
    position: absolute;
    top: 0;
    left: 0;
  }

  .mobile-bottom-nav-right {
    position: absolute;
    top: 0;
    right: 0;
  }
`
