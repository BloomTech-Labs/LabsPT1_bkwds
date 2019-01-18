import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const CTAButton = styled.div`
  display: flex;
  margin-top: 2rem;
  text-align: center;
  justify-content: center;
  color: white !important;
  border: none;
  background-color: #f26a21;
  width: 200px;
  height: 55px;
  border-radius: 12px;
  align-items: center;

  a {
    font-size: 23px;
    color: white !important;
    align-self: center;
    text-decoration: none;
  }

  h4 {
    color: white !important;
  }
`
class ButtonCTA extends Component {
  render() {
    return (
      <Link to="/login">
        <CTAButton>
          <h4>Hike with us.</h4>
        </CTAButton>
      </Link>
    )
  }
}

export default ButtonCTA
