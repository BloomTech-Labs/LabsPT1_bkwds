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
    isLoggedIn: false,
    isSignedUp: false,
    isError: false
  }

  logIn = (username, password) => {
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
        if (response.status === 200) {
          this.setState({ isLoggedIn: true })
        }
      })
      .catch(error => this.setState({ isError: true }))
  }

  signUp = (email, username, password) => {
    const body = { email, username, password }
    fetch(this.url + "signup", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 200) {
          this.setState({ isSignedUp: true })
        }
      })
      .catch(error => this.setState({ isError: true }))
  }

  render() {
    return (
      <Router>
        <Switch>
          <LayoutWrapper
            isLoggedIn={this.state.isLoggedIn}
            isSignedUp={this.state.isSignedUp}
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
              component={Progress}
            />
            <Route path="/trip/create" exact component={TripCreate} />
            <Route path="/billing" exact component={Billing} />
            <Route path="/settings" exact component={Settings} />
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
