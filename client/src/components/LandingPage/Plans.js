import React from "react"
import styled from "styled-components"

import { media } from "../../styles/theme/mixins"
import PlansCard from "./PlansCard"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: url(/images/hikerscontent.png);
  background-size: cover;

  h1 {
    color: white;
    text-align: left;
    text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.75);
    font-size: 2.5rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: visible;
  }

  ${media.tablet`
    height: 100%;
    padding: 10%;

    h1 {
      font-size: 1.75rem;
    }
  `}
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5%;
  margin: 5% 0;

  ${media.tablet`
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  `}
`

const Plans = () => (
  <Wrapper>
    <h1>Choose the right plan for you</h1>
    <Cards>
      <PlansCard title="free" price="0" />
      <PlansCard title="premium" price="9.99" />
    </Cards>
  </Wrapper>
)

export default Plans
