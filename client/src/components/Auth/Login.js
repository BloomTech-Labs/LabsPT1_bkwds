import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import LoginForm from "../forms/LoginForm"
import { login } from "../../redux/actions/auth"

const LoginStyles = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    width: 300px;
  }
`

const Login = props => {
  return (
    <LoginStyles>
      <h3>Log In</h3>
      <LoginForm onSubmit={props.login} />
    </LoginStyles>
  )
}

const mapDispatchToProps = { login }

export default connect(
  null,
  mapDispatchToProps
)(Login)
