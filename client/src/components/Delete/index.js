import React, { Component } from "react"
import { connect } from "react-redux"

import { login } from "../../redux/actions/auth"

class Delete extends Component {
  componentDidMount() {
    // this.props.login()
  }

  login = data => this.props.login(data)

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.login({ username: "username", password: "password" })
          }
        >
          {this.props.isLoggedIn ? "Already logged in" : "Log in"}
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = { login }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete)
