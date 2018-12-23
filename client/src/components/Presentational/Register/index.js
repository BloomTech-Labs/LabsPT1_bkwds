import React from "react"

import * as s from "./styles"
import RegisterForm from "../../forms/RegisterForm"

const Register = props => {
  return (
    <s.RegisterStyles>
      <h3>Sign Up</h3>
      <RegisterForm onSubmit={props.register} />
    </s.RegisterStyles>
  )
}

export default Register
