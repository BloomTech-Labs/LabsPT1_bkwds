import React from "react"
import styled from "styled-components"
import HeroPage from "./HeroPage"
import Features from "./Features"
import PageContentContainer from "./LandingPageContainer"

const LandingPageContainer = styled.div``

const LandingPage = () => {
  return (
    <LandingPageContainer>
      <HeroPage />
      <Features />
      <PageContentContainer />
    </LandingPageContainer>
  )
}

export default LandingPage
