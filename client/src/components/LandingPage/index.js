import React from "react"
import styled from "styled-components"

import MobileMenu from "./MobileMenu"
import Hero from "./Hero"
import Features from "./Features"
import Plans from "./Plans"
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

  .bm-item-list {
    padding: 40px 20px;
  }

  .bm-item {
    padding: 10px;
    font-size: 2rem;
    font-weight: 600;
    color: black;
    outline: none;
  }

  .bm-overlay {
    background: none !important;
  }
`

const LandingPage = () => (
  <LandingPageContainer id="landing-page">
    <MobileMenu />
    <Hero />
    <Features />
    <Plans />
    <FooterContent />
    <Footer />
  </LandingPageContainer>
)

export default LandingPage
