import React, { Component } from "react"
import { connect } from "react-redux"

import { login, logout } from "../../redux/actions/auth"

class FakeLogin extends Component {
  componentDidMount() {
    // this.props.login()
  }

  login = data => this.props.login(data)

  signout = () => this.props.logout()

  render() {
    return (
      <div>
        {!this.props.isLoggedIn ? (
          <button
            onClick={() =>
              this.login({ username: "username", password: "password" })
            }
          >
            Fake log in
          </button>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = { login, logout }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FakeLogin)
