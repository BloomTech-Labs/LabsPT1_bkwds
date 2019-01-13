import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Button, GhostInput } from "../../styles/theme/styledComponents"
import { SERVER_URI } from "../../config"

import { RecoverPasswordStyles as UpdatePasswordStyles } from "./RecoverPassword"

class UpdatePassword extends Component {
  state = {
    password: "",
    confirmPassword: "",
    submitted: false
  }

  // componentDidMount() {
  //   console.log("RESET PASSWORD PROPS:", this.props)
  // }

  handleChange = key => e => {
    this.setState({ [key]: e.target.value })
    // console.log(this.state)
  }

  updatePassword = e => {
    e.preventDefault()
    const { userId, token } = this.props
    const { password } = this.state

    // console.log("IN RESET PASSWORD SUBMIT!")
    // console.log("THIS.STATE:", this.state)
    // console.log("THIS.PROPS:", this.props)

    axios
      .post(
        // TODO: put password on REQ.BODY so it's harder to intercept
        `${SERVER_URI}/reset_password/receive_new_password/${userId}/${token}`,
        { password }
      )
      .then(res => console.log("RESPONSE FROM SERVER TO CLIENT:", res))
      .catch(err => console.log("SERVER ERROR TO CLIENT:", err))
    this.setState({ submitted: !this.state.submitted })
  }

  render() {
    const { submitted } = this.state

    return (
      <UpdatePasswordStyles>
        <h3 style={{ paddingBottom: "1.25rem" }}>Update your password</h3>
        {submitted ? (
          <div className="reset-password-form-sent-wrapper">
            <p>Your password has been saved.</p>
            <Link to="/login" className="ghost-btn">
              Sign back in
            </Link>
          </div>
        ) : (
          <div className="reset-password-form-wrapper">
            <form
              onSubmit={this.updatePassword}
              style={{ paddingBottom: "1.5rem" }}
            >
              <GhostInput
                onChange={this.handleChange("password")}
                value={this.state.password}
                placeholder="New password"
                type="password"
              />
              <GhostInput
                onChange={this.handleChange("confirmPassword")}
                value={this.state.confirmPassword}
                placeholder="Confirm password"
                type="password"
              />

              <Button className="btn-primary password-reset-btn">
                Update password
              </Button>
            </form>

            <p
              style={{
                fontSize: "1rem",
                maxWidth: "420px",
                paddingLeft: "0.5rem"
              }}
            >
              Make sure it's at least 8 characters including a number and a
              lowercase letter. Read some documentation on{" "}
              <a
                href="https://help.github.com/articles/creating-a-strong-password/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0056b3" }}
              >
                safer password practices
              </a>
              .
            </p>
          </div>
        )}
      </UpdatePasswordStyles>
    )
  }
}

export default UpdatePassword
