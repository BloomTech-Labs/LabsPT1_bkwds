import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { connect } from "react-redux"

import GitHubSvg from "../icons/GitHubSvg"
import { primary } from "../constants"

const NavStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 66px;
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
  a {
    padding-left: 8px;
    padding-right: 8px;
    color: rgba(23, 42, 58, 0.6);
    font-size: 14px;
  }
  a.github-icon-link {
    padding-right: 25px;
  }
`

const UnauthenticatedLinks = ({ pathname }) => (
  <div className="unauthenticated-links">
    {pathname === "/login" ? <Link to="/signup">Sign up</Link> : null}
    {pathname === "/signup" ? <Link to="/login">Login</Link> : null}
  </div>
)

const AuthenticatedLinks = () => (
  <div className="authenticated-links">
    <Link to="/trips">Trips</Link>
    <Link to="/settings">Settings</Link>
  </div>
)

function isProtectedPath(pathname, pathArray) {
  return pathArray.reduce(
    (acc, curr) => (pathname === curr ? true : acc),
    false
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
          {isLoggedIn ? <AuthenticatedLinks /> : null}
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

export default connect(mapStateToProps)(Nav)
