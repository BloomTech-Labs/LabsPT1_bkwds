import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { connect } from "react-redux"

import { logout } from "../../redux/actions/auth"
import { isProtectedPath } from "../../redux/helpers"
import { boxShadowMixin } from "../../theme/mixins"

import Dropdown from "./Dropdown"
import GitHubSvg from "../icons/GitHubSvg"
import UserSvg from "../icons/UserSvg"

const NavStyles = styled.div`
  background: ${props => props.theme.white};
  min-height: ${props => props.theme.navHeight};

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${boxShadowMixin};

  .nav-links-wrapper {
    width: 300px;
    /* display: flex;
    align-items: center; */
  }
  .logo {
    color: ${props => props.theme.primary};
    font-weight: 700;
    padding-left: 25px;
    padding-right: 25px;
    font-size: 1.75rem;
    letter-spacing: -0.0275rem;
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

  a.github-icon-link {
    padding: 0;
    padding-right: 25px;
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
        <li>
          <GitHubSvg width="32px" height="32px" />
        </li>
      </ul>
    )
  }
}

const Nav = props => {
  const { isLoggedIn } = props
  const { pathname } = props.location
  const protectedPaths = ["/", "/login", "/signup"]
  const isHomeOrAuthPath = isProtectedPath(pathname, protectedPaths)

  return (
    <NavStyles>
      <div className="logo">Backwoods Tracker</div>
      <div className="nav-links-wrapper">
        {isHomeOrAuthPath && !isLoggedIn ? (
          <UnauthenticatedLinks pathname={pathname} />
        ) : null}
        {isLoggedIn ? <AuthenticatedLinks logout={props.logout} /> : null}
      </div>
      {/* <div className="internal-links">
          {isHomeOrAuthPath && !isLoggedIn ? (
            <UnauthenticatedLinks pathname={pathname} />
          ) : null}
          {isLoggedIn ? <AuthenticatedLinks logout={props.logout} /> : null}
        </div>
        <div className="external-links">
          <GitHubSvg width="32px" height="32px" />
        </div>
      </div> */}
    </NavStyles>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  location: state.router.location
})

const mapDispatchToProps = { logout }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
