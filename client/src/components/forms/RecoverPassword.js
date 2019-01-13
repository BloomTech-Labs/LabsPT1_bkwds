import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button, GhostInput } from "../../styles/theme/styledComponents"
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
    margin-bottom: 0.625rem;
    font-size: 1.125rem;
  }

  input,
  button {
    width: 100%;
  }
  p {
    font-size: 1.125rem;
  }
  a {
    margin-top: 1rem;
  }
  .reset-password-form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 430px;
    margin: 0 auto;
  }
  .reset-password-form-sent-wrapper {
    max-width: 360px;
    text-align: center;
    p {
      text-align: left;
      margin-top: 1rem;
      margin-bottom: 0.75rem;
    }
  }
  .password-reset-btn {
    padding: 0.625rem 1.25rem;
    font-size: 1.125rem;
  }
`

class ResetPassword extends Component {
  state = {
    email: "",
    submitted: false
  }

  handleChange = e => {
    this.setState({ email: e.target.value })
  }

  sendPasswordResetEmail = e => {
    e.preventDefault()
    const { email } = this.state
    axios.post(`${SERVER_URI}/reset_password/user/${email}`)
    this.setState({ email: "", submitted: true })
  }

  render() {
    const { email, submitted } = this.state

    return (
      <ResetPasswordStyles>
        <h3>Reset your password</h3>
        {submitted ? (
          <div className="reset-password-form-sent-wrapper">
            <p>
              If that account is in our system, we emailed you a link to reset
              your password.
            </p>
            <Link to="/login" className="ghost-btn">
              Return to sign in
            </Link>
          </div>
        ) : (
          <div className="reset-password-form-wrapper">
            <p>
              It happens to the best of us. Enter your email and we'll send you
              reset instructions.
            </p>
            <form onSubmit={this.sendPasswordResetEmail}>
              <GhostInput
                onChange={this.handleChange}
                value={email}
                placeholder="Email address"
              />
              <Button className="btn-primary password-reset-btn">
                Send password reset email
              </Button>
            </form>
            <Link to="/login">I remember my password</Link>
          </div>
        )}
      </ResetPasswordStyles>
    )
  }
}

export default ResetPassword
