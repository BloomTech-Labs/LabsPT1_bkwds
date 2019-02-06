import React from "react"
import { Link } from "react-router-dom"
import * as s from "../../../styles/AppNav.styles"

const AppNav = () => (
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
        <div className="call-to-action" />
      </div>
    </s.NavStyles>
  </div>
)

export default AppNav
