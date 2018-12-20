import React from "react"
import styled from "styled-components"

import RegisterForm from "../forms/RegisterForm"

const RegisterStyles = styled.div`
  margin-top: ${props => "-" + props.theme.navHeight};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
