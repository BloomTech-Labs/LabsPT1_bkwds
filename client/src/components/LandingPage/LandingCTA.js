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
    text-shadow: 0.5px 0.5px 0.5px #000000;
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

const LandingCTA = () => {
  return (
    <CallToAction>
      <div>
        <h1>The companion app for</h1>
        <h1>
          <span className="accent">+ </span>
          hiking
        </h1>
        <h1>
          <span className="accent">+ </span>
          mountain climbing
        </h1>
        <ButtonCTA />
      </div>
    </CallToAction>
  )
}

export default LandingCTA
