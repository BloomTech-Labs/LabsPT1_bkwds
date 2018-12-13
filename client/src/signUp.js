import React from "react"

export default class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  }
  handleSubmit = e => {}

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3> SignUp </h3>
          <input
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="email"
          />
          <input
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="username"
          />
          <input
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="password"
          />

          <input
            id="passwordConfirm"
            value={this.state.passwordConfirm}
            onChange={this.handleChange}
            placeholder="Confirm Password"
          />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
