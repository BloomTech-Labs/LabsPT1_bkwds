import React from "react"
import { connect } from "react-redux"
import { Redirect, Route } from "react-router"

import { addTokenToState } from "../redux/actions/auth"

const CustomRoute = props => {
  const { isLoggedIn, protectedPath, checkedForToken, ...rest } = props

  // If not logged in and haven't checked for token yet,
  // try to query DB for user with token:
  if (!checkedForToken && !isLoggedIn) {
    props.addTokenToState()
  }

  if (isLoggedIn || !protectedPath) {
    return <Route {...rest} />
  }

  if (protectedPath && !isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/pages/login",
          state: { from: props.path }
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  checkedForToken: state.auth.checkedForToken
})

const mapDispatchToProps = { addTokenToState }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomRoute)
