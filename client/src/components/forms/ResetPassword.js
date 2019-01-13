import React, { Component } from "react"
import axios from "axios"
import { SERVER_URI } from "../../config"

class ResetPassword extends Component {
  state = {
    password: "",
    confirmPassword: ""
  }

  componentDidMount() {
    console.log("RESET PASSWORD PROPS:", this.props)
  }

  handleChange = key => e => {
    this.setState({ [key]: e.target.value })
    console.log(this.state)
  }

  resetPassword = e => {
    e.preventDefault()
    const { userId, token } = this.props
    const { password } = this.state

    console.log("IN RESET PASSWORD SUBMIT!")
    console.log("THIS.STATE:", this.state)
    console.log("THIS.PROPS:", this.props)

    axios
      .post(
        // TODO: put password on REQ.BODY so it's harder to intercept
        `${SERVER_URI}/reset_password/receive_new_password/${userId}/${token}`,
        { password }
      )
      .then(res => console.log("RESPONSE FROM SERVER TO CLIENT:", res))
      .catch(err => console.log("SERVER ERROR TO CLIENT:", err))
  }

  render() {
    return (
      <div>
        <div>Reset your password</div>
        <form onSubmit={this.resetPassword}>
          <input
            onChange={this.handleChange("password")}
            value={this.state.password}
            placeholder="New password"
          />
          <input
            onChange={this.handleChange("confirmPassword")}
            value={this.state.confirmPassword}
            placeholder="Confirm password"
          />
          <button>Reset Password</button>
        </form>
      </div>
    )
  }
}

export default ResetPassword
