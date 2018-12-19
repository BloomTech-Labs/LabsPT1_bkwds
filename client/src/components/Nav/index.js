import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import GitHubSvg from "../icons/GitHubSvg"
import BreadcrumbBar from "../Breadcrumb"

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

const UnauthenticatedLinks = () => {
  return (
    <div>
      <Link to="/signup">Sign up</Link>
      <Link to="/login">Log in</Link>
    </div>
  )
}

const Nav = props => {
  const { pathname } = props.location
  return (
    <NavStyles>
      <div className="logo">Backwoods Tracker</div>
      <div className="nav-links-wrapper">
        <div className="internal-links">
          {pathname === "/" && !props.isLoggedIn && <UnauthenticatedLinks />}
          {/* {pathname !== "/" &&
            pathname !== "/login" &&
            pathname !== "/signup" && <BreadcrumbBar {...props} />} */}
        </div>
        <div className="external-links">
          <GitHubSvg width="32px" height="32px" />
        </div>
      </div>
    </NavStyles>
  )
}

export default Nav
