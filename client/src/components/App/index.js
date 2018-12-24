import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"

import Dashboard from "../Dashboard"
import Login from "../Containers/Login"
import Register from "../Containers/Register"
import AppContainer from "../AppContainer"
import NewTrip from "../Containers/NewTrip"
import FakeLogin from "../FakeLogin"
import LandingPage from "../Pages/LandingPage"
import Trips from "../Trips"

export const TripsView = () => <div>Trips View component here!</div>
export const TripView = () => <div>Single Trip View component here!</div>
export const Progress = () => <div>Track and view trip progress here!</div>
export const Billing = () => <div>Billing component here!</div>
export const Settings = () => <div>Settings component here!</div>

const App = ({ isLoggedIn, isSignedUp }) => (
  <>
    <Route path="/" component={FakeLogin} />
    <Switch>
      <AppContainer>
        <Route
          path="/"
          exact
          render={() => (isLoggedIn ? <Dashboard /> : <LandingPage />)}
        />

        <Route
          path="/login"
          exact
          render={() => (isLoggedIn ? <Redirect to="/" /> : <Login />)}
        />
        <Route
          path="/signup"
          exact
          render={() => (isSignedUp ? <Redirect to="/login" /> : <Register />)}
        />
        <Route
          path="/trip/create"
          exact
          render={() => (!isLoggedIn ? <Redirect to="/" /> : <NewTrip />)}
        />
        <Route path="/trips/:tripId" exact component={TripView} />
        <Route path="/trips" exact component={Trips} />
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
      </AppContainer>
    </Switch>
  </>
)

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isSignedUp: state.auth.isSignedUp
})

export default connect(
  mapStateToProps,
  null
)(App)
