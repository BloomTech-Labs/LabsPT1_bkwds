import React from "react"
import { Switch } from "react-router-dom"

import AppContainer from "../AppContainer"
import Register from "../../containers/Register"
import Login from "../../containers/Login"
import CustomRoute from "../../utils/CustomRoute"

const pagesRoutes = [
  {
    path: "/signup",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
  // {
  //   path: "/pricing",
  //   name: "Pricing",
  //   component: Pricing
  // }
]

const Pages = ({ match }) => {
  return (
    <AppContainer>
      <Switch>
        {pagesRoutes.map(({ path, ...rest }, idx) => {
          return <CustomRoute path={match.path + path} {...rest} key={idx} />
        })}
      </Switch>
    </AppContainer>
  )
}

export default Pages
