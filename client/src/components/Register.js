import React from "react"

import * as s from "../styles/Register.styles"
import RegisterForm from "./forms/RegisterForm"

const Register = ({ register }) => {
  return (
    <s.RegisterStyles>
      <h3>Sign Up</h3>
      <RegisterForm onSubmit={register} />
    </s.RegisterStyles>
  )
}

export default Register
