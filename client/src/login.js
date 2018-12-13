import React from "react"

export default class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {}

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
            id="username"
          />

          <input
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            id="password"
          />

          <button>Submit</button>
        </form>
      </div>
    )
  }
}
