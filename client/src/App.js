import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { LayoutWrapper } from "./components/Wrapper"
import { LogIn, SignUp } from "./components/Authentication"
import TripList from "./components/Trips/TripList"

const App = () => {
  return (
    <Router>
      <Switch>
        <LayoutWrapper>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/trips" exact component={TripList} />
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

const Home = () => <div>Home component here!</div>
const TripView = () => <div>Single Trip View component here!</div>
const Progress = () => <div>Track and view trip progress here!</div>
const TripCreate = () => <div>Create New Trip here!</div>
const Billing = () => <div>Billing component here!</div>
const Settings = () => <div>Settings component here!</div>
export default App
