import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button, Input } from "../../styles/theme/styledComponents"
import styled from "styled-components"

// MOVE TO REDUX
import axios from "axios"
import { SERVER_URI } from "../../config"

const ResetPasswordStyles = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    width: 300px;
  }
  p,
  input {
    margin-bottom: 0.5rem;
  }
  input,
  button {
    width: 100%;
  }
  p {
    font-size: 1.125rem;
  }
  a {
    margin-top: 0.5rem;
  }
`

class ResetPassword extends Component {
  state = {
    email: ""
  }

  handleChange = e => {
    this.setState({ email: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log("form submitted")
    const { email } = this.state
    // post to server reset password url:
    console.log("POST URL:", `${SERVER_URI}/reset_password/user/${email}`)
    axios.post(`${SERVER_URI}/reset_password/user/${email}`)
  }

  render() {
    return (
      <ResetPasswordStyles>
        <h3>Reset your password</h3>
        <p>It happens to the best of us! Enter your email address:</p>
        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            value={this.state.email}
            placeholder="Email address *"
          />
          <Button className="btn-primary">Send password reset email</Button>
        </form>
        <Link to="/login">I remember my password</Link>
      </ResetPasswordStyles>
    )
  }
}

export default ResetPassword
