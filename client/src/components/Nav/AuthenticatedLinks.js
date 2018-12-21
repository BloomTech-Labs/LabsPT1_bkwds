import React, { Component } from "react"
import Dropdown from "./Dropdown"

class AuthenticatedLinks extends Component {
  state = {}

  handleLogout = e => {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    return (
      <ul className="authenticated-links">
        <Dropdown hidden={false} />
        <li>
          <a href="/logout" onClick={this.handleLogout}>
            Log out
          </a>
        </li>
      </ul>
    )
  }
}

export default AuthenticatedLinks
