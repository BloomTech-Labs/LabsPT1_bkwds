import React, { Component } from "react"
import styled from "styled-components"
import ButtonCTA from "./ButtonCTA"

const CallToAction = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 90%;
  width: 100%;
  margin-top: 42px;
  margin-right: 2rem;
  margin-left: 2rem;
  align-content: center;
  justify-content: start;

  h1 {
    color: white !important;
    box-shadow: 1px black;
  }
  div {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: center;
  }
  .accent {
    color: #f26a21 !important;
  }
`

class LandingCTA extends Component {
  render() {
    return (
      <CallToAction>
        <div>
          <h1>The companion app for</h1>
          <h1>
            <span className="accent">+ </span>
            Hiking
          </h1>
          <span className="accent">+</span>
          <span className="accent">Hiking</span>
          {/* <h1>+ hiking</h1> */}
          <h1>+ mountain climbing</h1>
          <ButtonCTA />
        </div>
      </CallToAction>
    )
  }
}

export default LandingCTA
