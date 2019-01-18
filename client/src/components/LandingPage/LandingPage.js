import React, { Component } from "react"
import styled from "styled-components"
import HeroPage from "./HeroPage"
const LandingPageContainer = styled.div``

class LandingPage extends Component {
  render() {
    return (
      <LandingPageContainer>
        <HeroPage />
      </LandingPageContainer>
    )
  }
}

export default LandingPage
