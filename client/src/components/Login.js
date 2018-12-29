import React from "react"

import * as s from "../styles/Login.styles"
import LoginForm from "./forms/LoginForm"

const Login = () => {
  return (
    <s.LoginStyles>
      <h3>Log In</h3>
      <LoginForm />
    </s.LoginStyles>
  )
}

export default Login
