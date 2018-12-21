import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import styled from "styled-components"
import { connect } from "react-redux"

import { logout } from "../../redux/actions/auth"
import { isProtectedPath } from "../../redux/helpers"
import { boxShadowMixin } from "../../theme/mixins"

import Dropdown from "./Dropdown"
import LandingPageNav from "./LandingPageNav"
import GitHubSvg from "../icons/GitHubSvg"
// import UserSvg from "../icons/UserSvg"

const NavStyles = styled.div`
  background: ${props => props.theme.white};
  min-height: ${props => props.theme.navHeight};

  /* relative positioning so that nav-links-cta 
     can position absolute with Nav as its parent */
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${boxShadowMixin};

  padding-left: 2rem;
  padding-right: 1.25rem;

  .nav-links-wrapper {
    /* This is to offset the Github logo, which is positioned absolutely */
    margin-right: 60px;
    /* width: 300px; */
  }
  .logo {
    color: ${props => props.theme.primary};
    font-weight: 700;
    font-size: 1.75rem;
    letter-spacing: -0.0275rem;
    height: 2rem;
  }

  ul {
    display: flex;
    flex-direction: row;
  }

  li {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  a {
    display: flex;
    align-items: center;
    height: 3.125rem;
    padding-left: 8px;
    padding-right: 8px;
    color: ${props => props.theme.midGray};
    font-size: 1.0625rem;
    font-weight: 400;
    &:hover {
      color: ${props => props.theme.primary};
    }
  }

  button {
    cursor: pointer;
    border: none;
    &:hover {
      text-decoration: underline;
    }
    padding-top: 0;
    padding-bottom: 0;
  }

  ul.authenticated-links {
    /* position: relative; */
  }

  .call-to-action {
    position: absolute;
    top: 0;
    right: 1.25rem;
    height: 100%;
    & a {
      height: 100%;
    }
  }
`

const UnauthenticatedLinks = ({ pathname }) => (
  <ul className="unauthenticated-links">
    {pathname === "/login" || pathname === "/" ? (
      <Link to="/signup">Sign up</Link>
    ) : null}
    {pathname === "/signup" || pathname === "/" ? (
      <Link to="/login">Login</Link>
    ) : null}
  </ul>
)

class AuthenticatedLinks extends Component {
  state = {}

  handleLogout = e => {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    return (
      <ul className="authenticated-links">
        <Dropdown hidden={false} />
        <li>
          <a href="/logout" onClick={this.handleLogout}>
            Log out
          </a>
        </li>
      </ul>
    )
  }
}

const Nav = ({ location, logout, isLoggedIn }) => {
  const { pathname } = location
  const protectedPaths = ["/", "/login", "/signup"]
  const isHomeOrAuthPath = isProtectedPath(pathname, protectedPaths)

  return (
    <div>
      {pathname === "/" ? (
        <LandingPageNav />
      ) : (
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
      )}
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
