import React, { Component } from "react"
import PropTypes from "prop-types"

import Dropdown from "./Dropdown"
import * as s from "../styles/AuthenticatedLinks.styles"

class AuthenticatedLinks extends Component {
  handleLogout = e => {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    return (
      <s.AuthenticatedLinksStyles className="AuthenticatedLinksStyles">
        <Dropdown />
        <li>
          <a href="/logout" onClick={this.handleLogout}>
            Log out
          </a>
        </li>
      </s.AuthenticatedLinksStyles>
    )
  }
}

AuthenticatedLinks.propTypes = {
  logout: PropTypes.func.isRequired
}

export default AuthenticatedLinks
