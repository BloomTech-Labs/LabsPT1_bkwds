import React from "react"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"

export default class LogIn extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="email"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
            />
          </FormGroup>
          <Button
            onClick={() =>
              this.props.handleLogIn(this.state.username, this.state.password)
            }
          >
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
