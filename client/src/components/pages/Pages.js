import React from "react"
import { Switch } from "react-router-dom"

import AppContainer from "../AppContainer"
import Register from "../Register"
import Login from "../Login"
import CustomRoute from "../../utils/CustomRoute"

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
  }
]

const Pages = ({ match }) => {
  return (
    <AppContainer>
      <Switch>
        {pagesRoutes.map(({ path, ...rest }, idx) => {
          const pathname = match.path === "/" ? path : match.path + path
          return <CustomRoute path={pathname} {...rest} key={idx} />
        })}
      </Switch>
    </AppContainer>
  )
}

export default Pages
