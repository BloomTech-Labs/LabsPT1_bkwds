import React from "react"
import styled from "styled-components"
import HeroPage from "./HeroPage"
import Features from "./Features"
import LandingPageContent from "./LandingPageContent"
import FooterContent from "./FooterContent"
import Footer from "./Footer"

const LandingPageContainer = styled.div``

const LandingPage = () => {
  return (
    <LandingPageContainer>
      <HeroPage />
      <Features />
      <LandingPageContent />
      <FooterContent />
      <Footer />
    </LandingPageContainer>
  )
}

export default LandingPage
