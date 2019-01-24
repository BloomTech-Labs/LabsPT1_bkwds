import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"

import AuthenticatedLinks from "./AuthenticatedLinks"
import UnauthenticatedLinks from "./UnauthenticatedLinks"
import GitHubSvg from "./icons/GitHubSvg"
import UserSvg from "./icons/UserSvg"

import { logout } from "../redux/actions/auth"
import { toggleSidebar } from "../redux/actions/navigation"
import { isProtectedPath } from "../utils"
import { HamburgerSpring } from "react-animated-burgers"

import { withTheme } from "styled-components"
import * as s from "../styles/AppNav.styles"

const protectedPaths = ["/", "/login", "/register"]
class AppNav extends Component {
  state = { dropdownOpen: false }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  render() {
    const {
      logout,
      isLoggedIn,
      location,
      isSidebarOpen,
      toggleSidebar,
      theme
    } = this.props
    const { pathname } = location
    const isHomeOrAuthPath = isProtectedPath(pathname, protectedPaths)
    return (
      <div>
        <s.NavStyles>
          <div className="appnav-left">
            <HamburgerSpring
              className="hamburger-icon"
              buttonWidth={20}
              barColor={`${theme.primary}`}
              isActive={isSidebarOpen}
              toggleButton={() => toggleSidebar(isSidebarOpen)}
            />
            <div className="logo">
              bkwds<span className="logo-flourish">.</span>
            </div>
          </div>
          <div className="appnav-right">
            <div className="navlinks-wrapper">
              {isHomeOrAuthPath && !isLoggedIn ? (
                <UnauthenticatedLinks
                  className="unauthenticated-links"
                  pathname={pathname}
                />
              ) : null}
              {isLoggedIn && (
                <AuthenticatedLinks
                  className="authenticated-links"
                  logout={logout}
                />
              )}
            </div>
            <div className="call-to-action">
              <GitHubSvg width="32px" height="32px" />
            </div>
            <div className="mobile-links-wrapper">
              <Dropdown
                nav={true}
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle className="mobile-dropdown-toggle">
                  <UserSvg width="1.5" height="1.5" />
                </DropdownToggle>
                <DropdownMenu right={true}>
                  <DropdownItem>
                    <Link to="/app/settings" className="dropdown-list-item">
                      Settings
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/billing/invoices" className="dropdown-list-item">
                      Invoices
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/billing" className="dropdown-list-item">
                      Billing
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/profile" className="dropdown-list-item">
                      Your Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/logout" className="dropdown-list-item">
                      Log out
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </s.NavStyles>
      </div>
    )
  }
}

AppNav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  theme: PropTypes.any.isRequired
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isSidebarOpen: state.navigation.isSidebarOpen
})

const mapDispatchToProps = {
  logout,
  toggleSidebar
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTheme(AppNav))
)
