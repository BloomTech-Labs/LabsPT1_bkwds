import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import AppNav from "../../Presentational/Nav/AppNav"
import { logout } from "../../../redux/actions/auth"
import { isProtectedPath } from "../../../redux/helpers"

const protectedPaths = ["/", "/login", "/signup"]

const AppNavContainer = ({ location, logout, isLoggedIn }) => {
  const { pathname } = location
  const isHomeOrAuthPath = isProtectedPath(pathname, protectedPaths)

  return (
    <AppNav
      isLoggedIn={isLoggedIn}
      isHomeOrAuthPath={isHomeOrAuthPath}
      pathname={pathname}
      logout={logout}
    />
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
  )(AppNavContainer)
)
