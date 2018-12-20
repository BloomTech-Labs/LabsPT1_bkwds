import React from "react"
// import { Form, FormGroup, FormFeedback, Input, Label, Button } from "reactstrap"
import styled from "styled-components"

import { Input, Form, Button } from "../../theme/styledComponents"

const RegisterStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
  form {
    width: 300px;
  }
`

export default class Register extends React.Component {
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
      <RegisterStyles>
        <Form onSubmit={this.handleSubmit}>
          <h3> Sign Up </h3>
          <Input
            id="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email"
            valid={this.state.email !== "" && isEmailValid}
            invalid={this.state.email !== "" && !isEmailValid}
          />
          <Input
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Username"
          />
          <Input
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          {/* <FormFeedback>Your passwords don't match!</FormFeedback> */}
          <Input
            id="passwordConfirm"
            type="password"
            value={this.state.passwordConfirm}
            onChange={this.handleChange}
            placeholder="Confirm Password"
            valid={this.state.passwordConfirm !== "" && isPasswordConfirmValid}
            invalid={
              this.state.passwordConfirm !== "" && !isPasswordConfirmValid
            }
          />
          {/* <FormFeedback>Your passwords don't match!</FormFeedback> */}
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
      </RegisterStyles>
    )
  }
}
