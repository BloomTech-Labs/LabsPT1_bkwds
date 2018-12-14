import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navigation from "./NavigationMenu"
import TripList from "../Trips/TripList"
import User from "../User/User"

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={exampleComponent} />
        <Route path="/signin" exact component={exampleComponent} />
        <Route path="/signup" exact component={exampleComponent} />
        <Route path="/trips" exact component={TripList} />
        <Route path="/trip/:tripId" exact component={exampleComponent} />
        <Route
          path="/trip/:tripId/progress/:progressId"
          exact
          component={exampleComponent}
        />
        <Route path="/travelers/:userId" exact component={User} />

        <Route path="/trip/create" exact component={exampleComponent} />
        <Route path="/billing" exact component={exampleComponent} />
        <Route path="/settings" exact component={exampleComponent} />
      </Switch>
    </Router>
  )
}

const exampleComponent = () => <span>example component</span>
export default Main
