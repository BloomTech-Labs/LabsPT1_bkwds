import React from "react"
import decodeToken from "jwt-decode"
import { Redirect } from "react-router-dom"

const requireAuth = Comp => {
  function RequireAuthentication(props) {
    const jwt = localStorage.getItem("jwt")
    let decoded

    if (jwt) decoded = decodeToken(jwt)
    return decoded && decoded.name ? <Comp {...props} /> : <Redirect to="/" />
  }

  return RequireAuthentication
}

export default requireAuth
