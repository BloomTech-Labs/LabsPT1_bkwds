import React from "react"

import * as s from "../styles/Login.styles"
import NewLoginForm from "./forms/NewLoginForm"
// import LoginForm from "../../forms/LoginForm"

const Login = props => {
  return (
    <s.LoginStyles>
      <h3>Log In</h3>
      <NewLoginForm onSubmit={props.login} />
    </s.LoginStyles>
  )
}

export default Login
