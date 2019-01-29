import React from "react"
import styled from "styled-components"

import Hero from "./Hero"
import Features from "./Features"
import LandingPageContent from "./LandingPageContent"
import FooterContent from "./FooterContent"
import Footer from "./Footer"
import { fontDeclarations } from "../../styles/theme/mixins"

const LandingPageContainer = styled.div`
  overflow: auto;
  height: 100%;
  ${fontDeclarations}
  font-family: "Wals";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const LandingPage = () => (
  <LandingPageContainer>
    <Hero />
    <Features />
    <LandingPageContent />
    <FooterContent />
    <Footer />
  </LandingPageContainer>
)

export default LandingPage
