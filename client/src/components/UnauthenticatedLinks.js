import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const UnauthenticatedLinks = ({ pathname }) => (
  <ul className="unauthenticated-links">
    {pathname === "/login" || pathname === "/" ? (
      <Link to="/register">Sign up</Link>
    ) : null}
    {pathname === "/register" || pathname === "/" ? (
      <Link to="/login">Login</Link>
    ) : null}
  </ul>
)

UnauthenticatedLinks.propTypes = {
  pathname: PropTypes.string.isRequired
}

export default UnauthenticatedLinks
