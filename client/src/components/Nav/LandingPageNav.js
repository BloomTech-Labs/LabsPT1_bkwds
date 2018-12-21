import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { boxShadowMixin } from "../../theme/mixins"
import ChevronSvg from "../icons/ChevronSvg"
import UserSvg from "../icons/UserSvg"

const LandingPageNavStyles = styled.div`
  background: ${props => props.theme.white};
  min-height: ${props => props.theme.navHeight};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${boxShadowMixin};

  .landing-page-banner {
    color: ${props => props.theme.white};
    /* background-color: ${props => props.theme.primaryDark}; */
    background-color: #0e153f;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 100%;

    span {
      font-weight: 400;
      font-size: 1.125rem;
      letter-spacing: 0.0275rem;
    }
    span.banner-app-title {
      color: 
/* style={{ color: "#d7ecf7" }} */

    }
  }

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
      padding-right: .5rem;
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
      margin-left: .375rem;
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

  /* Backwards "B" in BT Logo */
  span.reverse-letter {
    display: inline-block;
    /* transform: rotateY(180deg); */
    transform: translate(2px, 3px);
  }
`

// prettier-ignore
const LandingPageNav = () => {
  return (
    <LandingPageNavStyles>
      <div className="landing-page-banner">
        <span className="banner-app-title">
          <span >Backwoods Tracker</span>: Built for
          adventures.
        </span>
      </div>
      <div className="landing-page-nav">

        {/* 1024px or less ONLY */}
        <div className="landing-page-mobile-nav">
          <div className="landing-page-mobile-menu">
            <div className="landing-page-mobile-logo">
              <span><span className="reverse-letter">B</span>T</span>
            </div>
            <button className="landing-page-mobile-cta">
              Register
              <ChevronSvg height={"1.15rem"} />
            </button>
          </div>
          <div className="landing-page-mobile-links">
            <Link to="/settings">
              <UserSvg width="1.188rem" height="1.313rem" />
            </Link>
          </div>
        </div>
        {/* END: 1024px or less ONLY */}

      </div>
    </LandingPageNavStyles>
  )
}

export default LandingPageNav
