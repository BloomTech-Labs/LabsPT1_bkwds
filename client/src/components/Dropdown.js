import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"
import { logout } from "../redux/actions/auth"
import * as s from "../styles/Dropdown.styles"
import ChevronSvg from "./icons/ChevronSvg"
import { UserPropTypes } from "./propTypes"

class NavDropdown extends Component {
  state = {
    dropdownOpen: false
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  onMouseEnter = () => {
    this.setState({ dropdownOpen: true })
  }

  onMouseLeave = () => {
    this.setState({ dropdownOpen: false })
  }

  handleLogout = e => {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    const { user } = this.props
    return (
      <s.DropdownStyles>
        <Dropdown
          onMouseOver={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle className="navbar-toggle">
            {!user.displayName && user.email}
            {user.displayName && "Hi, " + user.displayName + "!"}
            <ChevronSvg fill="#a3a3a3" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <Link to="/app/settings" className="dropdown-list-item">
                Settings
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
                Profile
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <a href="/logout" onClick={this.handleLogout}>
                Log out
              </a>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </s.DropdownStyles>
    )
  }
}

NavDropdown.propTypes = {
  user: UserPropTypes.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ user: state.auth.user })

const mapDispatchToProps = {
  logout
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavDropdown)
