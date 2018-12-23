import styled from "styled-components"
import { boxShadowMixin, media, flexCenterMixin } from "../../../theme/mixins"

export const LandingNavStyles = styled.div`
  background: ${props => props.theme.white};
  height: 0;

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
    /* @media all and (min-width: 1024px) {
      display: none;
    } */

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
    transform: translateY(calc(-60px - 0px));
    ${media.tablet`transform: translateY(calc(-70px - 0px))`};
    transition: transform 0.25s ease-in-out;
  }

  .landing-page-mobile-menu {
    display: flex;
    align-items: center;
    height: 100%;
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

export const LandingNavBottomStyles = styled.div`
  /* This is a hack to hide the small mobile navbar on Desktop for now. */
  /* .hide-mobile-nav-on-desktop {
    @media all and (min-width: 1024px) {
      display: none;
    }
  } */

  .mobile-bottom-nav {
    /* ${media.desktop`height: 5.5625rem`}; */
    height: 5.5625rem;
    ${media.tablet`height: 2.75rem`};

    top: 3rem;
    /* ${media.tablet`top: 3rem`}; */
    /* top: 3.125rem; */
    position: fixed;
    left: 0;
    right: 0;
    ${flexCenterMixin};
    justify-content: space-between;

    /* Consider turning these off until you test them more */
    transform: translateY(60px);
    ${media.tablet`transform: translateY(70px)`};
    transition: transform 0.25s ease-in-out;

    background: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }


  .mobile-bottom-nav-left.split-top-on-mobile {
    ${flexCenterMixin};
    justify-content: space-between;
    width: 100%;
    flex: 1;
    h1 {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.167;
      letter-spacing: 0.01875rem;
      color: #1e306e;
      margin-bottom: 0;
      ${media.tablet`margin: 0 40px;`}
      ${media.phone`margin: 0 20px;`}
    }
    button {
      display: flex;
      font-size: 0.95rem;
      border: none;
      color: ${props => props.theme.primary};
      border-bottom: 1px solid rgba(33, 43, 100, 0.25);
      cursor: pointer;
      transition: border-color 0.15s ease-out;
      padding: 0;
      ${media.tablet`margin: 0 40px;`}
      ${media.phone`margin: 0 20px;`}
    }

    /*  TODO: Rename classes, bc this code applies to tablet
        sizes ONLY */
    @media screen and (min-width: 769px) {
      flex-direction: column;
      align-items: flex-start;
      margin-left: 2rem;
      margin-right: 2rem;
    }
  }


  .mobile-bottom-nav-right.split-bottom-on-mobile {
    box-shadow: 0 -0.125rem 0.25rem 0 rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
    transform: translateY(0);

    /* Fix to bottom of screen on tablets & smaller */
    ${media.tablet`
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
    `}

    /* Otherwise render at top with sibling */
    @media all and (min-width: 769px) {
      visibility: hidden;
    }
  }

  .mobile-bottom-cta-wrapper {
    display: flex;
    padding: 0.75rem;
    position: relative;
    z-index: 2;
    text-align: center;
    background: #fff;
  }

  .mobile-bottom-cta-text {
    flex: 1;
    margin-right: 0.75rem;
    text-align: left;

    h2 {
      font-size: 1.125rem;
      margin-bottom: 0;
    }
    p {
      margin-bottom: 0;
      font-weight: 300;
      color: ${props => props.theme.lightGray};
    }
  }

  /* Renders instead of sibling .split-bottom */
  .tablet-bottom-nav-right {
    /* Only shows on tablet screens & above */
    ${media.tablet`display: none;`}
    
    .tablet-bottom-cta-wrapper {
      position: fixed;
      /* This style is also mutated in the JSX component */
      top: 7.25rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0.75rem;
      text-align: right;

      .tablet-bottom-cta-text {
        h2 {
          margin-bottom: 0;
          font-size: 1.15rem;
          white-space: nowrap;
        }

        p {
          margin-bottom: 0;
          color: #a3a3a3;
        }
      }

      button { 
        padding: 0.75rem 1rem;
        margin-left: 0.75rem; 
        width: 14rem;
      }


      /* background: purple; */


    }

  }
`
