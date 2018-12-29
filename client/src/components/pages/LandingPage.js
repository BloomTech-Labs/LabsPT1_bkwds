import React from "react"
import Landing from "../Landing"
import LandingNav from "../LandingNav"
import { GlobalStyles } from "../../styles/theme/GlobalStyles"

const LandingPage = () => {
  return (
    <>
      <GlobalStyles />
      <LandingNav />
      <Landing />
    </>
  )
}

export default LandingPage
