import React from "react"
import styled from "styled-components"
import HeroPage from "./HeroPage"
import Features from "./Features"
import LandingPageContent from "./LandingPageContent"
import LandingPageContent2 from "./LandingPageContent2"

const LandingPageContainer = styled.div``

const LandingPage = () => {
  return (
    <LandingPageContainer>
      <HeroPage />
      <Features />
      <LandingPageContent />
      <LandingPageContent2 />
    </LandingPageContainer>
  )
}

export default LandingPage
