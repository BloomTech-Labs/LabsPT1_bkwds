import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import AppNav from "./AppNav"
import Sidebar from "./Sidebar"
import { GlobalStyles } from "../styles/theme/GlobalStyles"
import { logout } from "../redux/actions/auth"
import { isProtectedPath } from "../utils"

const Right = styled.div`
  background: ${props => props.theme.ghostWhite};
  width: 100%;
`

const AppContainer = ({ pathname, children, isLoggedIn }) => {
  const authPaths = ["/register", "/login"]
  const showBreadcrumbs = !isProtectedPath(pathname, [...authPaths])
  const showSidebar = isLoggedIn && showBreadcrumbs
  const userOnAuthPath = authPaths.includes(pathname)
  const mainWrapperClassList = [
    "main-wrapper",
    userOnAuthPath ? "main-wrapper-auth" : null
  ]

  return (
    <>
      <GlobalStyles />
      <div className={mainWrapperClassList.join(" ")}>
        <AppNav />
        {/* {showBreadcrumbs ? <Breadcrumbs /> : null} */}
        {showSidebar ? (
          <div className="main-content with-sidebar">
            <Sidebar id="sidebar" />
            <Right id="Right">{children}</Right>
          </div>
        ) : (
          <div className="main-content">{children}</div>
        )}
        <ToastContainer />
      </div>
    </>
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
)(AppContainer)
