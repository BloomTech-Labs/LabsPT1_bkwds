import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { connect } from "react-redux"

import GitHubSvg from "../icons/GitHubSvg"
import { primary } from "../constants"
import { logout } from "../../redux/actions/auth"
import { isProtectedPath } from "../../redux/helpers"

const NavStyles = styled.div`
  background: ${props => props.theme.white};
  height: ${props => `${props.theme.navHeight}px`};

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 2px solid rgba(23, 42, 58, 0.1);
  line-height: 0;
  .nav-links-wrapper {
    display: flex;
    align-items: center;
  }
  .logo {
    color: ${primary};
    font-weight: 900;
    text-transform: uppercase;
    padding-left: 25px;
    padding-right: 25px;
    font-size: 20px;
  }
  a,
  button {
    padding-left: 8px;
    padding-right: 8px;
    color: rgba(23, 42, 58, 0.6);
    font-size: 14px;
  }
  a.github-icon-link {
    padding-right: 25px;
  }
  button {
    cursor: pointer;
    border: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const UnauthenticatedLinks = ({ pathname }) => (
  <div className="unauthenticated-links">
    {pathname === "/login" || pathname === "/" ? (
      <Link to="/signup">Sign up</Link>
    ) : null}
    {pathname === "/signup" || pathname === "/" ? (
      <Link to="/login">Login</Link>
    ) : null}
  </div>
)

const AuthenticatedLinks = ({ logout }) => {
  const handleLogout = e => {
    e.preventDefault()
    logout()
  }

  return (
    <div className="authenticated-links">
      <Link to="/trips">Trips</Link>
      <Link to="/settings">Settings</Link>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
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
        <div className="internal-links">
          {isHomeOrAuthPath && !isLoggedIn ? (
            <UnauthenticatedLinks pathname={pathname} />
          ) : null}
          {isLoggedIn ? <AuthenticatedLinks logout={props.logout} /> : null}
        </div>
        <div className="external-links">
          <GitHubSvg width="32px" height="32px" />
        </div>
      </div>
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
