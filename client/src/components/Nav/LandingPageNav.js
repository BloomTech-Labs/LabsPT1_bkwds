import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { boxShadowMixin } from "../../theme/mixins"
import ChevronSvg from "../icons/ChevronSvg"
import UserSvg from "../icons/UserSvg"
// import FlagSvg from "../icons/FlagSvg"

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
      font-weight: 600;
      font-size: 1rem;
      /* line-height: 1.25; */
      letter-spacing: 0.0275rem;
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
      padding-top: 0.375rem;
      padding-bottom: 0;
      font-size: 1.25rem;
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
      margin-left: -0.15rem;
      margin-top: -6px;

    }
  }

  .landing-page-mobile-cta {
    height: 100%;
    /* Chevron icon: */
    span {
      align-self: center;
      width: .625rem;
      height: .625rem;
      margin-left: .4375rem;
      margin-bottom: .1875rem;
      fill: currentColor;
    }
  }

  .landing-page-mobile-links {
    position: absolute;
    top: 0;
    right: 0.25rem;
    display: flex;
    align-items: center;
    height: 100%;
    /* Mobile icons on right side of the screen */
    a {
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
  }
`

const LandingPageNav = () => {
  return (
    <LandingPageNavStyles>
      <div className="landing-page-banner">
        <span>An app for adventurers.</span>
      </div>

      <div className="landing-page-nav">
        {/* Only renders on 1024px or less */}
        <div className="landing-page-mobile-nav">
          <div className="landing-page-mobile-menu">
            <div className="landing-page-mobile-logo">
              <span>BT</span>
            </div>
            <button className="landing-page-mobile-cta">
              Register
              <ChevronSvg height={".625rem"} width={".625rem"} />
            </button>
          </div>

          <div className="landing-page-mobile-links">
            <Link to="/settings">
              <UserSvg width="1.188rem" height="1.313rem" />
            </Link>
          </div>
        </div>
      </div>
    </LandingPageNavStyles>
  )
}

export default LandingPageNav
