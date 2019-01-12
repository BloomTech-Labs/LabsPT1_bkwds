import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import AuthenticatedLinks from "./AuthenticatedLinks"
import UnauthenticatedLinks from "./UnauthenticatedLinks"
import GitHubSvg from "./icons/GitHubSvg"

import { logout } from "../redux/actions/auth"
import { isProtectedPath } from "../utils"
import * as s from "../styles/AppNav.styles"

const protectedPaths = ["/", "/login", "/register"]

const AppNav = ({ location, logout, isLoggedIn }) => {
  const { pathname } = location
  const isHomeOrAuthPath = isProtectedPath(pathname, protectedPaths)

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

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = {
  logout
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppNav)
)
