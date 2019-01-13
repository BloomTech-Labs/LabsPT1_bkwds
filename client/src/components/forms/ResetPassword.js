import React, { Component } from "react"
import axios from "axios"

class ResetPassword extends Component {
  state = {
    password: "",
    confirmPassword: "",
    userId: "",
    token: ""
  }

  componentDidMount() {
    console.log("RESET PASSWORD PROPS:", this.props)
  }

  resetPassword = e => {
    e.preventDefault()
    console.log("IN RESET PASSWORD SUBMIT!")
    console.log("THIS.STATE:", this.state)
    console.log("THIS.PROPS:", this.props)
  }

  render() {
    return (
      <div>
        <div>Reset your password</div>
        <form onSubmit={this.resetPassword}>
          <input placeholder="New password" />
          <input placeholder="Confirm password" />
          <button>Reset Password</button>
        </form>
      </div>
    )
  }
}

export default ResetPassword
