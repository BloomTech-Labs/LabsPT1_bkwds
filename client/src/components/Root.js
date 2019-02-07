import React from "react"
import { Switch, Route } from "react-router-dom"

import LandingPage from "./LandingPage/"
import Dashboard from "./pages/Dashboard"
import CustomRoute from "../utils/CustomRoute"
import Pages from "./pages/Pages"
import PublicTrip from "./Maps/singleTripPublic"
import ActiveTrip from "./Maps/singleTrip"

const Root = () => (
  <Switch>
    <CustomRoute path="/" exact component={LandingPage} />
    <Route
      exact
      path="/public/:tripId"
      render={({ match }) => (
        <ActiveTrip tripId={match.params.tripId} isPublic={true} />
      )}
    />
    <CustomRoute path="/app" protectedPath component={Dashboard} />
    <CustomRoute path="/" component={Pages} />
    <CustomRoute render={() => <div>404: Route not found</div>} />
    <Pages />
  </Switch>
)
export default Root
