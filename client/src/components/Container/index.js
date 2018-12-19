import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import Nav from "../Nav"
import BreadcrumbBar from "../Breadcrumb"
import { logout } from "../../redux/actions/auth"

const ContainerStyles = styled.div`
  height: 100vh;
`

const Container = props => {
  return (
    <ContainerStyles>
      <Nav />

      {props.location.pathname !== "/" &&
        props.location.pathname !== "/login" &&
        props.location.pathname !== "/signup" && <BreadcrumbBar {...props} />}
      {props.children}
    </ContainerStyles>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  location: state.router.location
})

const mapDispatchToProps = { handleSignOut: logout }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
