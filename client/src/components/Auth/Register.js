import React from "react"
import styled from "styled-components"

import RegisterForm from "../forms/RegisterForm"

const RegisterStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
  form {
    width: 300px;
  }
`

const Register = () => {
  return (
    <RegisterStyles>
      <h3>Sign Up</h3>
      <RegisterForm onSubmit={() => window.alert("submitted!")} />
    </RegisterStyles>
  )
}

export default Register
