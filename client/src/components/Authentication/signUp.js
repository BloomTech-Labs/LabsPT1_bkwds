import React from "react"
import { Form, FormGroup, FormFeedback, Input, Label, Button } from "reactstrap"
export default class SignUp extends React.Component {
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    const isEmailValid = this.emailRegex.test(this.state.email)
    const isPasswordConfirmValid =
      this.state.passwordConfirm === this.state.password
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <h3> SignUp </h3>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
              valid={this.state.email !== "" && isEmailValid}
              invalid={this.state.email !== "" && !isEmailValid}
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Username"
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
            <FormFeedback>Your passwords don't match!</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="passwordConfirm">Confirm Password</Label>
            <Input
              id="passwordConfirm"
              type="password"
              value={this.state.passwordConfirm}
              onChange={this.handleChange}
              placeholder="Confirm Password"
              valid={
                this.state.passwordConfirm !== "" && isPasswordConfirmValid
              }
              invalid={
                this.state.passwordConfirm !== "" && !isPasswordConfirmValid
              }
            />
            <FormFeedback>Your passwords don't match!</FormFeedback>
          </FormGroup>
          <Button
            onClick={() =>
              this.props.handleSignUp(
                this.state.email,
                this.state.username,
                this.state.password
              )
            }
          >
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
