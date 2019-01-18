import React from "react"
import styled from "styled-components"
import Nav from "./LandingPageNav"
import LandingCTA from "./LandingCTA"

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(./images/LPBackground.jpg);
  background-size: cover;
  height: 100vh;
  width: 100vw;
`
const CTAContainer = styled.div`
  height: 100%;
`

const HeroPage = () => {
  return (
    <HeroContainer>
      <Nav />
      <CTAContainer>
        <LandingCTA />
      </CTAContainer>
    </HeroContainer>
  )
}

export default HeroPage
