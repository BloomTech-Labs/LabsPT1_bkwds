import React from "react"
import { connect } from "react-redux"

import Nav from "../Nav"
import BreadcrumbBar from "../Breadcrumb"
import Sidebar from "../Sidebar"
import { GlobalStyles } from "../../theme/styledComponents"
import { logout } from "../../redux/actions/auth"
import { isProtectedPath } from "../../redux/helpers"

const Container = ({ pathname, children }) => {
  const protectedPaths = ["/", "/signup", "/login"]
  const isHomeOrProtectedPath = isProtectedPath(pathname, protectedPaths)
  return (
    <GlobalStyles>
      <Nav />
      {pathname !== "/" && pathname !== "/login" && pathname !== "/signup" && (
        <BreadcrumbBar />
      )}
      {!isHomeOrProtectedPath && <Sidebar />}
      {children}
    </GlobalStyles>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  pathname: state.router.location.pathname
})

const mapDispatchToProps = { handleSignOut: logout }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
