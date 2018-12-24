import React from "react"
import { Link, withRouter } from "react-router-dom"
import { Button } from "../../../theme/styledComponents"
import * as s from "./styles"

const SidebarLink = ({ to, displayName, pathname }) => (
  <Button className={pathname === to ? "btn-inverted" : ""}>
    <Link to={to}>{displayName}</Link>
  </Button>
)

const Sidebar = ({ location }) => {
  return (
    <s.SidebarStyles>
      <div className="sidebar-links">
        <SidebarLink to="/" displayName="Home" pathname={location.pathname} />
        <SidebarLink
          to="/trip/create"
          displayName="Add a trip"
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
    </s.SidebarStyles>
  )
}

export default withRouter(Sidebar)
