import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"

import { Button } from "../styles/theme/styledComponents"
import * as s from "../styles/Sidebar.styles"

const SidebarLink = ({ icon, displayName, pathname, to }) => (
  <Button className={pathname === to ? "btn-inverted" : ""}>
    <Link to={to}>
      <i className={`fa ${icon}`} />
    </Link>
    <Link to={to}>{displayName}</Link>
  </Button>
)

const menuItems = [
  {
    displayName: "Dashboard",
    icon: "fa-tachometer",
    to: "/app"
  },
  {
    displayName: "Create a new trip",
    icon: "fa-plus-circle",
    to: "/app/trip/create"
  },
  {
    displayName: "Trips",
    icon: "fa-map-marker",
    to: "/app/trips"
  },
  {
    displayName: "Archived Trips",
    icon: "fa-map",
    to: "/app/trips/archived"
  },
  {
    displayName: "Billing",
    icon: "fa-credit-card",
    to: "/app/billing"
  },
  {
    displayName: "Settings",
    icon: "fa-cog",
    to: "/app/settings"
  },
  {
    displayName: "Landing Page",
    icon: "fa-heart",
    to: "/"
  },
  {
    displayName: "Login",
    icon: "fa-heart",
    to: "/login"
  },
  {
    displayName: "Register",
    icon: "fa-heart",
    to: "/register"
  }
]

const Sidebar = ({ location, isSidebarOpen, isSubscribed }) => (
  <s.SidebarStyles>
    <div className={`sidebar-links ${isSidebarOpen ? "open" : ""}`}>
      {menuItems.map(menuItem => {
        if (menuItem.displayName === "Billing" && !isSubscribed) {
          return (
            <SidebarLink
              icon="fa-star"
              to="/app/upgrade"
              displayName="Upgrade to Premium"
              pathname={location.pathname}
            />
          )
        }
        return (
          <SidebarLink
            {...menuItem}
            key={menuItem.displayName}
            pathname={location.pathname}
          />
        )
      })}
    </div>
  </s.SidebarStyles>
)

Sidebar.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string
  }).isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  isSubscribed: PropTypes.bool.isRequired
}

SidebarLink.propTypes = {
  displayName: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default compose(
  withRouter,
  connect(({ auth, navigation: { isSidebarOpen } }) => ({
    isSidebarOpen,
    isSubscribed: auth.user.subscribed
  }))
)(Sidebar)
