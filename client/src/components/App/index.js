import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"

import { Register, Login } from "../Auth"
import AppContainer from "../AppContainer"
import FakeLogin from "../FakeLogin"
import LandingPage from "../Pages/LandingPage"
import Trips from "../Trips"

export const TripsView = () => <div>Trips View component here!</div>
export const TripView = () => <div>Single Trip View component here!</div>
export const Progress = () => <div>Track and view trip progress here!</div>
export const TripCreate = () => <div>Create New Trip here!</div>
export const Billing = () => <div>Billing component here!</div>
export const Settings = () => <div>Settings component here!</div>

const App = props => (
  <AppContainer>
    {/* REMOVE THIS COMPONENT BEFORE PUSHING TO PRODUCTION; FOR TESTING UI CHANGE FOR LOGIN ONLY */}
    <Route path="/" component={FakeLogin} />
    <Switch>
      <Route path="/" component={LandingPage} exact />
      <Route
        path="/login"
        exact
        render={() => (props.isLoggedIn ? <Redirect to="/" /> : <Login />)}
      />
      <Route
        path="/signup"
        exact
        render={() =>
          props.isSignedUp ? <Redirect to="/login" /> : <Register />
        }
      />
      <Route path="/trips" exact component={Trips} />
      <Route path="/trips/:tripId" exact component={TripView} />
      <Route
        path="/trip/create"
        exact
        render={() =>
          !props.isLoggedIn ? <Redirect to="/" /> : <TripCreate />
        }
      />
      <Route
        path="/billing"
        exact
        render={() => (!props.isLoggedIn ? <Redirect to="/" /> : <Billing />)}
      />
      <Route
        path="/settings"
        exact
        render={() => (!props.isLoggedIn ? <Redirect to="/" /> : <Settings />)}
      />
    </Switch>
  </AppContainer>
)

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isSignedUp: state.auth.isSignedUp
})

export default connect(
  mapStateToProps,
  null
)(App)
