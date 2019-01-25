import React from "react"
import Landing from "../Landing"
import LandingNav from "../LandingNav"
import { GlobalStyles } from "../../styles/theme/GlobalStyles"
import Features from "../LandingPage/Features"
import ArchivedTrips from "../ArchivedTrips"
import DashboardHome from "../DashboardHome"
import Settings from "../Settings"
import EditTrip from "../EditTrip"

import CustomRoute from "../../utils/CustomRoute"

const landingPageRoutes = [
  {
    path: "/features",
    name: "Features",
    component: Features
  },
  {
    path: "/about",
    name: "About",
    component: Features
  },
  {
    path: "/features",
    name: "Features",
    component: Features
  },
  {
    path: "/features",
    name: "Features",
    component: Features
  }
]

const LandingPage = ({ match }) => {
  return (
    <AppContainer>
      <Switch>
        {landingPageRoutes.map(({ path, ...rest }, idx) => {
          const pathname = match.path === "/" ? path : match.path + path
          return <CustomRoute path={pathname} {...rest} key={idx} />
        })}
      </Switch>
    </AppContainer>
  )
}

export default LandingPage
