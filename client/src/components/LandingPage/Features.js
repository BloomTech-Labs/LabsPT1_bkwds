import React, { Component } from "react"
import styled from "styled-components"
import Nav from "./LandingPageNav"
import LandingCTA from "./LandingCTA"
import HeaderContainer from "./HeaderContainer"

//WIP --VIC
const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-auto-rows: 200px;
  grid-template-areas:
        'head head head head'
        'main main main main'
        'com com com com'
        'foot foot foot foot'
    .header {
    grid-area: head;
  }

  .main {
    grid-area: head;
  }
`

const CTAContainer = styled.div``

class Features extends Component {
  render() {
    return (
      <FeaturesContainer>
        <HeaderContainer className="header" />
        {/* <CTAContainer>
                <BannerCTA />

            </CTAContainer> */}
        <LandingCTA className="main" />
      </FeaturesContainer>
    )
  }
}

export default Features
