import React from "react"

import * as s from "./styles"
import LoginForm from "../../forms/LoginForm"

const Login = props => {
  return (
    <s.LoginStyles>
      <h3>Log In</h3>
      <LoginForm onSubmit={props.login} />
    </s.LoginStyles>
  )
}

export default Login
