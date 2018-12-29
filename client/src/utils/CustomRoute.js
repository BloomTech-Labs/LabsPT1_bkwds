import React from "react"
import { connect } from "react-redux"
import { Redirect, Route } from "react-router"

const CustomRoute = props => {
  const { isLoggedIn, protectedPath, ...rest } = props
  if (isLoggedIn || !protectedPath) {
    return <Route {...rest} />
  }

  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: props.path }
      }}
    />
  )
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.isLoggedIn
})

export default connect(mapStateToProps)(CustomRoute)
