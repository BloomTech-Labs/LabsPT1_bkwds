import React from "react"
import styled from "styled-components"

import Header from "./Header"
import Button from "./Button"
import Typewriter from "./Typewriter"
import { media } from "../../styles/theme/mixins"

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(/images/bg.jpg);
  background-size: cover;
  height: 100vh;
  width: 100%;
`

const CallToAction = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 200px;
  height: 90%;
  width: 100%;

  h1 {
    color: white;
    text-align: left;
    text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.75);
    font-size: 2.5rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: visible;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  a:hover {
    text-decoration: none;
  }

  ${media.tablet`
    grid-template-columns: 1fr;
    padding: 100px;

    h1 {
      font-size: 2rem;
    }
  `}

  ${media.phone`
    grid-template-columns: 1fr;
    padding: 0;


    h1 {
      font-size: 1.95em;
    }
  `}
`

const Hero = () => (
  <HeroContainer>
    <Header />
    <CallToAction>
      <div className="wrapper">
        <h1>The companion app for</h1>
        <Typewriter
          text={[
            "hiking",
            "mountain climbing",
            "adventures",
            "trekking",
            "bouldering",
            "traveling"
          ]}
        />
        <div className="button-wrapper">
          <Button />
        </div>
      </div>
    </CallToAction>
  </HeroContainer>
)

export default Hero
