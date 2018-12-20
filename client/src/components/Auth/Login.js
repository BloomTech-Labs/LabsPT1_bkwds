import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import { Input, Form, Button } from "../../theme/styledComponents"
import { login } from "../../redux/actions/auth"

const LoginStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
  form {
    width: 300px;
  }
`

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleLogin = e => {
    this.props.login({
      username: this.state.username,
      password: this.state.password
    })
  }

  render() {
    return (
      <LoginStyles>
        <h3>Log In</h3>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="email"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            id="username"
          />
          <Input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            id="password"
          />
          <Button className="btn-secondary" onClick={this.handleLogin}>
            Submit
          </Button>
        </Form>
      </LoginStyles>
    )
  }
}

const mapDispatchToProps = { login }

export default connect(
  null,
  mapDispatchToProps
)(Login)
