import React, { Component } from "react"
import { Link } from "react-router-dom"
import GitHubSvg from "../../icons/GitHubSvg"
import * as s from "../../../styles/AppNav.styles"

class AppNav extends Component {
  render() {
    return (
      <div>
        <s.NavStyles>
          <div className="appnav-left">
            <div className="logo">
              <Link to="/">
                bkwds<span className="logo-flourish">.</span>
              </Link>
            </div>
          </div>
          <div className="appnav-right">
            <div className="navlinks-wrapper" />
            <div className="call-to-action">
              <GitHubSvg width="32px" height="32px" />
            </div>
          </div>
        </s.NavStyles>
      </div>
    )
  }
}

export default AppNav
