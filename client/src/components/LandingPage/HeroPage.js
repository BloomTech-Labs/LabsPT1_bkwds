import React, { Component } from "react"
import styled from "styled-components"
import Nav from "./LandingPageNav"
import LandingCTA from "./LandingCTA"

const Container = styled.div`
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

class HeroPage extends Component {
  render() {
    return (
      <Container>
        <Nav />
        <CTAContainer>
          <LandingCTA />
        </CTAContainer>
      </Container>
    )
  }
}

export default HeroPage
