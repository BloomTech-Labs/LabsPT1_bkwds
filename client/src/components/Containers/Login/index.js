import React from "react"
import { connect } from "react-redux"

import { login } from "../../../redux/actions/auth"
import Login from "../../Presentational/Login"

const LoginContainer = props => <Login login={props.login} />

const mapDispatchToProps = { login }

export default connect(
  null,
  mapDispatchToProps
)(LoginContainer)
