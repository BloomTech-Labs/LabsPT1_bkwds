import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import { logout } from "../../redux/actions/auth"
import { isProtectedPath } from "../../redux/helpers"
import { NavStyles } from "./styles"
import UnauthenticatedLinks from "./UnauthenticatedLinks"
import AuthenticatedLinks from "./AuthenticatedLinks"
import GitHubSvg from "../icons/GitHubSvg"

const Nav = ({ location, logout, isLoggedIn }) => {
  const { pathname } = location
  const protectedPaths = ["/", "/login", "/signup"]
  const isHomeOrAuthPath = isProtectedPath(pathname, protectedPaths)

  return (
    <div>
      <NavStyles>
        <div className="logo">Backwoods Tracker</div>
        <div className="nav-links-wrapper">
          {isHomeOrAuthPath && !isLoggedIn ? (
            <UnauthenticatedLinks pathname={pathname} />
          ) : null}
          {isLoggedIn ? <AuthenticatedLinks logout={logout} /> : null}
        </div>
        <div className="call-to-action">
          <GitHubSvg width="32px" height="32px" />
        </div>
      </NavStyles>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = { logout }

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nav)
)
