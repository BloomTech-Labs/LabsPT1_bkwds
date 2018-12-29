import React from "react"
import Landing from "../Landing"
import LandingNav from "../LandingNav"
import { GlobalStyles } from "../../styles/theme/GlobalStyles"

const LandingPage = () => {
  return (
    <>
      <GlobalStyles />
      <LandingNav scrollY={100} />
      <Landing />
    </>
  )
}

export default LandingPage
