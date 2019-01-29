import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { ToastContainer } from "react-toastify"
import PropTypes from "prop-types"

import "react-toastify/dist/ReactToastify.css"

import { GlobalStyles } from "../styles/theme/GlobalStyles"
import AppNav from "./AppNav"
import Sidebar from "./Sidebar"
import { media } from "../styles/theme/mixins"
import { isProtectedPath } from "../utils"

const Right = styled.div`
  overflow-y: scroll;
  background: ${props => props.theme.ghostWhite};
  width: 100%;
  padding-left: 50px;
  ${media.tablet`
    padding-left: 0;
  `};
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
            <Right id="right">{children}</Right>
          </div>
        ) : (
          <div className="main-content">{children}</div>
        )}
        <ToastContainer />
      </div>
    </>
  )
}

AppContainer.propTypes = {
  children: PropTypes.element.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  pathname: state.router.location.pathname
})

export default connect(mapStateToProps)(AppContainer)
