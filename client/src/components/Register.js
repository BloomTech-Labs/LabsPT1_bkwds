import React from "react"

import * as s from "../styles/Register.styles"
import RegisterForm from "./forms/RegisterForm"

const Register = () => {
  return (
    <s.RegisterStyles>
      <h3>Sign Up</h3>
      <RegisterForm />
    </s.RegisterStyles>
  )
}

export default Register
