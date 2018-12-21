import React from "react"
import Landing from "../../Presentational/Landing"
import LandingNav from "../../Presentational/LandingNav"
import { GlobalStyles } from "../../../theme/GlobalStyles"

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
