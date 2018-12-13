import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./login"
import SignUp from "./signUp"
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={exampleComponent} />
        <Route path="/signin" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/trip" exact component={exampleComponent} />
        <Route path="/trip/:tripId" exact component={exampleComponent} />
        <Route
          path="/trip/:tripId/progress/:progressId"
          exact
          component={exampleComponent}
        />
        <Route path="/trip/create" exact component={exampleComponent} />
        <Route path="/billing" exact component={exampleComponent} />
        <Route path="/settings" exact component={exampleComponent} />
      </Switch>
    </Router>
  )
}

const exampleComponent = () => <span>example component</span>
export default App
