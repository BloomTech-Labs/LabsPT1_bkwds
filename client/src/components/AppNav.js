import React from "react"
import * as s from "../styles/AppNav.styles"

import AuthenticatedLinks from "./AuthenticatedLinks"
import UnauthenticatedLinks from "./UnauthenticatedLinks"
import GitHubSvg from "./icons/GitHubSvg"

const AppNav = ({ pathname, logout, isLoggedIn, isHomeOrAuthPath }) => {
  return (
    <div>
      <s.NavStyles>
        <div className="logo">Backwoods Tracker</div>
        <div className="nav-links-wrapper">
          {isHomeOrAuthPath && !isLoggedIn ? (
            <UnauthenticatedLinks pathname={pathname} />
          ) : null}
          {isLoggedIn && <AuthenticatedLinks logout={logout} />}
        </div>
        <div className="call-to-action">
          <GitHubSvg width="32px" height="32px" />
        </div>
      </s.NavStyles>
    </div>
  )
}

export default AppNav
