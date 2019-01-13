import React from "react"
import { Switch } from "react-router-dom"

import AppContainer from "../AppContainer"
import Register from "../Register"
import Login from "../Login"

import ResetPassword from "../forms/ResetPasswordForm"
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
  },
  {
    path: "/password/recover",
    name: "ResetPassword",
    component: ResetPassword
  },
  {
    path: "reset_password/:userId/:email",
    name: "RecoverPasswordURL",
    component: ({ match }) => (
      <div>
        Recover password link, url match: {JSON.stringify(match, null, 2)}
      </div>
    )
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
