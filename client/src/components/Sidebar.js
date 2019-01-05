import React from "react"
import { Link, withRouter } from "react-router-dom"
import { Button } from "../styles/theme/styledComponents"
import * as s from "../styles/Sidebar.styles"

const SidebarLink = ({ to, displayName, pathname }) => (
  <Button className={pathname === to ? "btn-inverted" : ""}>
    <Link to={to}>{displayName}</Link>
  </Button>
)

const Sidebar = ({ location }) => {
  return (
    <s.SidebarStyles>
      <div className="sidebar-links">
        <div style={{ marginLeft: "2rem" }}>App:</div>
        <SidebarLink
          to="/app"
          displayName="Dashboard"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/app/trip/create"
          displayName="Create a new trip"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/app/trips"
          displayName="Trips"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/app/trips/archived"
          displayName="Archived Trips"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/app/billing"
          displayName="Billing"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/app/settings"
          displayName="Settings"
          pathname={location.pathname}
        />
        <div style={{ marginLeft: "2rem" }}>Pages:</div>
        <SidebarLink
          to="/"
          displayName="Landing Page"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/pages/login"
          displayName="Login"
          pathname={location.pathname}
        />
        <SidebarLink
          to="/pages/signup"
          displayName="Register"
          pathname={location.pathname}
        />
      </div>
    </s.SidebarStyles>
  )
}

export default withRouter(Sidebar)
