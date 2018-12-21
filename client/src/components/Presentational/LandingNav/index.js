import React from "react"
import { Link } from "react-router-dom"

import BannerContainer from "../../Containers/BannerContainer"
import ChevronSvg from "../../icons/ChevronSvg"
import UserSvg from "../../icons/UserSvg"
import * as s from "./styles"

// prettier-ignore
const LandingNav = props => {
  return (
    <s.LandingNavStyles>
      <BannerContainer />
        <div className="landing-page-nav">

          {/* 1024px or less ONLY */}
          <div className="landing-page-mobile-nav">
            <div className="landing-page-mobile-menu">
              <div className="landing-page-mobile-logo">
                <span><span className="translate-letter">B</span>T</span>
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
    </s.LandingNavStyles>
  )
}

export default LandingNav
