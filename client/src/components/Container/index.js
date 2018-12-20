import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import Nav from "../Nav"
import BreadcrumbBar from "../Breadcrumb"
import Sidebar from "../Sidebar"
import { logout } from "../../redux/actions/auth"
import { isProtectedPath } from "../../redux/helpers"

const ContainerStyles = styled.div`
  height: 100vh;

  span.form-error {
    font-size: 12px;
    color: ${props => props.theme.secondaryDark};
  }
`

const Container = ({ pathname, children }) => {
  const protectedPaths = ["/", "/signup", "/login"]
  const isHomeOrProtectedPath = isProtectedPath(pathname, protectedPaths)
  return (
    <ContainerStyles>
      <Nav />
      {pathname !== "/" && pathname !== "/login" && pathname !== "/signup" && (
        <BreadcrumbBar />
      )}
      {!isHomeOrProtectedPath && <Sidebar />}
      {children}
    </ContainerStyles>
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
