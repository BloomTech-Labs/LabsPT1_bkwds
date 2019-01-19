import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import AuthenticatedLinks from "./AuthenticatedLinks"
import UnauthenticatedLinks from "./UnauthenticatedLinks"
import GitHubSvg from "./icons/GitHubSvg"

import { logout } from "../redux/actions/auth"
import { toggleSidebar } from "../redux/actions/navigation"
import { isProtectedPath } from "../utils"
import { HamburgerSpring } from "react-animated-burgers"

import { withTheme } from "styled-components"
import * as s from "../styles/AppNav.styles"

const protectedPaths = ["/", "/login", "/register"]

const AppNav = ({
  location,
  logout,
  isLoggedIn,
  isSidebarOpen,
  toggleSidebar,
  theme
}) => {
  const { pathname } = location
  const isHomeOrAuthPath = isProtectedPath(pathname, protectedPaths)
  return (
    <div>
      <s.NavStyles>
        <div className="hamburger-icon-wrapper">
          <HamburgerSpring
            className="hamburger-icon"
            buttonWidth={20}
            barColor={`${theme.primary}`}
            isActive={isSidebarOpen}
            toggleButton={() => toggleSidebar(isSidebarOpen)}
          />
          <div className="logo">Backwoods Tracker</div>
        </div>
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
  isLoggedIn: state.auth.isLoggedIn,
  isSidebarOpen: state.navigation.isSidebarOpen
})

const mapDispatchToProps = {
  logout,
  toggleSidebar
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTheme(AppNav))
)
