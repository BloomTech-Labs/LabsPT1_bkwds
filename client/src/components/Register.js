import React from "react"

import * as s from "../styles/Register.styles"
import RegisterForm from "./forms/RegisterForm"

const Register = () => {
  return (
    <s.RegisterStyles>
      <h4>Sign up</h4>
      <RegisterForm />
    </s.RegisterStyles>
  )
}

export default Register
