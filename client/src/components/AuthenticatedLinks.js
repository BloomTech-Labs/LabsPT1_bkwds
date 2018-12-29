import React, { Component } from "react"
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

export default AuthenticatedLinks
