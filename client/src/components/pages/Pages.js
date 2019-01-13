import React from "react"
import { Switch } from "react-router-dom"

import AppContainer from "../AppContainer"
import Register from "../Register"
import Login from "../Login"

import CustomRoute from "../../utils/CustomRoute"
import RecoverPassword from "../forms/RecoverPassword"
import UpdatePassword from "../forms/UpdatePassword"

const pagesRoutes = [
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/password/recover",
    name: "RecoverPassword",
    component: RecoverPassword
  },
  {
    path: "/password/reset/:userId/:token",
    name: "UpdatePassword",
    component: UpdatePassword
  }
]

const Pages = ({ match }) => {
  return (
    <AppContainer>
      <Switch>
        {pagesRoutes.map(({ path, ...rest }, idx) => {
          // Normalize match.path to remove extra / at beginning if mounting Pages on root route:
          const pathname = match.path === "/" ? path : match.path + path
          return <CustomRoute path={pathname} {...rest} key={idx} />
        })}
      </Switch>
    </AppContainer>
  )
}

export default Pages
