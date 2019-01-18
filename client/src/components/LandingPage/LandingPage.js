import React from "react"
import styled from "styled-components"
import HeroPage from "./HeroPage"
import Features from "./Features"

const LandingPageContainer = styled.div``

const LandingPage = () => {
  return (
    <LandingPageContainer>
      <HeroPage />
      <Features />
    </LandingPageContainer>
  )
}

export default LandingPage
