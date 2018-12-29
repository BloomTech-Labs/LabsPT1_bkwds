import React, { Component } from "react"
import { connect } from "react-redux"
import { login } from "../../redux/actions/auth"

class NewLoginForm extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = key => e => {
    this.setState({ [key]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    this.props.login({ username, password })
  }

  render() {
    return (
      <>
        <form>
          <input type="text" onChange={this.handleChange("username")} />
          <input type="password" onChange={this.handleChange("password")} />
          <button type="submit" onClick={this.handleSubmit}>
            Log in
          </button>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = { login }

export default connect(
  null,
  mapDispatchToProps
)(NewLoginForm)
