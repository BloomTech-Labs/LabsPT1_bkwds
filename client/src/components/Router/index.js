import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import axios from "axios"
import { LayoutWrapper } from "../Wrapper"
import { LogIn, SignUp } from "../Authentication"
import {
  Home,
  TripView,
  TripsView,
  Progress,
  TripCreate,
  Billing,
  Settings
} from "../App"

export default class AppRouter extends Component {
  url = "https://backwoods-tracker.herokuapp.com/api/"
  state = {
    user: null,
    isLoggedIn: true,
    isSignedUp: false,
    isError: false,
    error: null
  }

  logIn = (username, password) => {
    if (!username || !password) {
      return null
    }
    const body = { username, password }
    axios
      .post(this.url + "login", body)
      .then(response => {
        if (response.data && response.data.user && response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.token))
          this.setState({ isLoggedIn: true, user: response.user })
        }
      })
      .catch(error => this.setState({ isError: true, error }))
  }

  signUp = (email, username, password) => {
    if (!email || !username || !password) {
      return null
    }
    const body = { email, username, password }
    axios
      .post(this.url + "register", body)
      .then(res => {
        if (res.status === 201) {
          this.setState({ isSignedUp: true })
        }
      })
      .catch(error => {
        this.setState({ isError: true, error })
      })
  }

  signOut = () => {
    localStorage.removeItem("user")
    this.setState({ isLoggedIn: false })
  }

  render() {
    const { isLoggedIn, isSignedUp, isAuthenticated } = this.state
    return (
      <Router>
        <Switch>
          <LayoutWrapper
            isLoggedIn={isLoggedIn}
            isSignedUp={isSignedUp}
            handleSignOut={this.signOut}
          >
            <Route path="/" exact component={Home} />
            <Route
              path="/login"
              exact
              render={() =>
                isLoggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <LogIn
                    handleLogIn={this.logIn}
                    isAuthenticated={isAuthenticated}
                  />
                )
              }
            />
            <Route
              path="/signup"
              exact
              render={() =>
                isSignedUp ? (
                  <Redirect to="/login" />
                ) : (
                  <SignUp handleSignUp={this.signUp} />
                )
              }
            />
            <Route path="/trips" exact component={TripsView} />
            <Route path="/trips/:tripId" exact component={TripView} />
            <Route
              path="/trip/:tripId/progress/:progressId"
              exact
              render={() => (!isLoggedIn ? <Redirect to="/" /> : Progress)}
            />
            <Route
              path="/trip/create"
              exact
              render={() => (!isLoggedIn ? <Redirect to="/" /> : TripCreate)}
            />
            <Route
              path="/billing"
              exact
              render={() => (!isLoggedIn ? <Redirect to="/" /> : <Billing />)}
            />
            <Route
              path="/settings"
              exact
              render={() => (!isLoggedIn ? <Redirect to="/" /> : <Settings />)}
            />
          </LayoutWrapper>
        </Switch>
      </Router>
    )
  }
}
