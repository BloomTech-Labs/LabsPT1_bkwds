import React, { Component } from "react"
import { connect } from "react-redux"

import { Form, Input, Button } from "../../styles/theme/styledComponents"
import { login } from "../../redux/actions/auth"

class LoginForm extends Component {
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
        <Form>
          <Input
            type="text"
            placeholder="Username or email"
            onChange={this.handleChange("username")}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={this.handleChange("password")}
          />
          <Button className="btn" type="submit" onClick={this.handleSubmit}>
            Log in
          </Button>
        </Form>
      </>
    )
  }
}

const mapDispatchToProps = { login }

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)
