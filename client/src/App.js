import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { LayoutWrapper } from "./components/Wrapper"
import { LogIn, SignUp } from "./components/Authentication"

class App extends React.Component {
  url = "https://backwoods-tracker.herokuapp.com/api/"
  state = {
    user: null,
    isLoggedIn: false,
    isSignedUp: false,
    isError: false,
    error: null
  }

  logIn = (username, password) => {
    if (!username || !password) {
      return null
    }
    const body = { username, password }
    fetch(this.url + "login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.user && response.token) {
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
    fetch(this.url + "register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
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
    return (
      <Router>
        <Switch>
          <LayoutWrapper
            isLoggedIn={this.state.isLoggedIn}
            isSignedUp={this.state.isSignedUp}
            handleSignOut={this.signOut}
          >
            <Route path="/" exact component={Home} />
            <Route
              path="/login"
              exact
              render={() =>
                this.state.isLoggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <LogIn
                    handleLogIn={this.logIn}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                )
              }
            />
            <Route
              path="/signup"
              exact
              render={() =>
                this.state.isSignedUp ? (
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
              render={() =>
                !this.state.isLoggedIn ? <Redirect to="/" /> : Progress
              }
            />
            <Route
              path="/trip/create"
              exact
              render={() =>
                !this.state.isLoggedIn ? <Redirect to="/" /> : TripCreate
              }
            />
            <Route
              path="/billing"
              exact
              render={() =>
                !this.state.isLoggedIn ? <Redirect to="/" /> : Billing
              }
            />
            <Route
              path="/settings"
              exact
              render={() =>
                !this.state.isLoggedIn ? <Redirect to="/" /> : Settings
              }
            />
          </LayoutWrapper>
        </Switch>
      </Router>
    )
  }
}

const Home = () => <div>Home component here!</div>
const TripsView = () => <div>Trips View component here!</div>
const TripView = () => <div>Single Trip View component here!</div>
const Progress = () => <div>Track and view trip progress here!</div>
const TripCreate = () => <div>Create New Trip here!</div>
const Billing = () => <div>Billing component here!</div>
const Settings = () => <div>Settings component here!</div>
export default App
