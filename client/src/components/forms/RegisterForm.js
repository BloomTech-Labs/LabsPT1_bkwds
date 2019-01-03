import React, { Component } from "react"
import { connect } from "react-redux"

import { Form, Input, Button } from "../../styles/theme/styledComponents"
import { register } from "../../redux/actions/auth"

class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  }

  handleChange = key => e => {
    this.setState({ [key]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, email, password } = this.state
    this.props.register({ username, email, password })
    this.setState({
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
    })
  }

  render() {
    return (
      <>
        <Form>
          <Input
            type="email"
            placeholder="Email"
            onChange={this.handleChange("email")}
          />
          <Input
            type="text"
            placeholder="Username"
            onChange={this.handleChange("username")}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={this.handleChange("password")}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange("passwordConfirm")}
          />
          <Button className="btn" type="submit" onClick={this.handleSubmit}>
            Log in
          </Button>
        </Form>
      </>
    )
  }
}

const mapDispatchToProps = { register }

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm)
