import React from "react"
import { Switch } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
// import Pages from "./pages/Pages"
import LandingPage from "./pages/LandingPage"
import CustomRoute from "../utils/CustomRoute"
import Pages from "./pages/Pages"

const Root = () => (
  <Switch>
    <CustomRoute path="/" exact component={LandingPage} />
    <CustomRoute path="/app" protectedPath component={Dashboard} />
    <CustomRoute path="/" component={Pages} />
    <CustomRoute render={() => <div>404: Route not found</div>} />
    <Pages />
  </Switch>
)
export default Root
