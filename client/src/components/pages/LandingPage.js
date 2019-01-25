import React from "react"
import Features from "../LandingPage/Features"
import FooterContent from "../LandingPage/FooterContent"
import Hero from "../LandingPage/Hero"
import Features from "../LandingPage/Features"

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
    path: "/",
    name: "Home",
    component: Hero
  },
  {
    path: "/contact",
    name: "FooterContent",
    component: FooterContent
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
