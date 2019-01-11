import React from "react"
import { Switch } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
// import Pages from "./pages/Pages"
import LandingPage from "./pages/LandingPage"
import CustomRoute from "../utils/CustomRoute"
import Login from "./Login"
import Register from "./Register"

const Root = () => (
  <Switch>
    <CustomRoute path="/" exact component={LandingPage} />
    <CustomRoute path="/app" protectedPath component={Dashboard} />
    <CustomRoute path="/login" component={Login} />
    <CustomRoute path="/Register" component={Register} />
    <CustomRoute render={() => <div>404: Route not found</div>} />
  </Switch>
)

export default Root
