import React from "react"
import { Link } from "react-router-dom"

const UnauthenticatedLinks = ({ pathname }) => (
  <ul className="unauthenticated-links">
    {pathname === "/login" || pathname === "/" ? (
      <Link to="/signup">Sign up</Link>
    ) : null}
    {pathname === "/signup" || pathname === "/" ? (
      <Link to="/login">Login</Link>
    ) : null}
  </ul>
)

export default UnauthenticatedLinks
