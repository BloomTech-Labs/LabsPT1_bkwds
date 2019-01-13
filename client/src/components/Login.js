import React from "react"
import { Link } from "react-router-dom"

import * as s from "../styles/Login.styles"
import LoginForm from "./forms/LoginForm"

const Login = () => (
  <s.LoginStyles>
    <h3>Log In</h3>
    <LoginForm />
    <Link to="/password/recover">Forgot your password?</Link>
  </s.LoginStyles>
)

export default Login
