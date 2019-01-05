import React, { Component } from "react"
import { connect } from "react-redux"

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"
import { Link } from "react-router-dom"

import * as s from "../styles/Dropdown.styles"
import ChevronSvg from "./icons/ChevronSvg"

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
          <DropdownToggle>
            Hi, {user.username ? user.username + "!" : "Account"}{" "}
            <ChevronSvg fill="#a3a3a3" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <Link to="/settings" className="dropdown-list-item">
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
          </DropdownMenu>
        </Dropdown>
      </s.DropdownStyles>
    )
  }
}

const mapStateToProps = state => ({ user: state.auth.user })

export default connect(mapStateToProps)(NavDropdown)
