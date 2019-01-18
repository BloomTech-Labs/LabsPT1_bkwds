import React, { Component } from "react"
import styled from "styled-components"

const CTAButton = styled.div`
  display: flex;
  margin-right: 3rem;
  text-align: center;
  justify-content: center;
  color: white !important;
  border: none;
  background-color: #f26a21;
  width: 200px;
  height: 75px;
  border-radius: 12px;
  align-items: center;

  a {
    font-size: 23px;
    color: white !important;
    align-self: center;
  }

  h4 {
    color: white !important;
  }
`
class ButtonCTA extends Component {
  render() {
    return (
      <CTAButton>
        <h4>Hike with us.</h4>
      </CTAButton>
    )
  }
}

export default ButtonCTA
