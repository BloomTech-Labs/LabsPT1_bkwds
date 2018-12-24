import React from "react"
import { Link, withRouter } from "react-router-dom"
import styled from "styled-components"
import { Button } from "../../theme/styledComponents"

const SidebarStyles = styled.div`
  width: ${props => `${props.theme.sidebarWidth}px`};
  /* .sidebar-links {
    width: ${props => `${props.theme.sidebarWidth}px`};
    height: 100vh;
  } */
  button {
    width: 100%;
    border-radius: 0;
    display: flex;
    padding: 0;
    border-bottom: 1px solid ${props => props.theme.ghostWhite};
    a {
      flex: 0 0 100%;
      padding: 6px 12px;
    }
  }
`

const SidebarLink = ({ to, displayName, pathname }) => (
  <Button className={pathname === to ? "btn-inverted" : ""}>
    <Link to={to}>{displayName}</Link>
  </Button>
)

const Sidebar = ({ location }) => {
  return (
    <SidebarStyles>
      <div className="sidebar-links">
        <SidebarLink
          to="/"
          displayName="Landing Page"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/trips"
          displayName="Trips"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/billing"
          displayName="Billing"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/settings"
          displayName="Settings"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/login"
          displayName="Login"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/signup"
          displayName="Register"
          pathname={location.pathname}
        />
      </div>
    </SidebarStyles>
  )
}

export default withRouter(Sidebar)
