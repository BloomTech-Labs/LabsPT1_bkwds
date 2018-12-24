import React from "react"
import { connect } from "react-redux"

import Register from "../../Presentational/Register"
import { register } from "../../../redux/actions/auth"

const RegisterContainer = props => <Register register={props.register} />

const mapDispatchToProps = { register }

export default connect(
  null,
  mapDispatchToProps
)(RegisterContainer)
