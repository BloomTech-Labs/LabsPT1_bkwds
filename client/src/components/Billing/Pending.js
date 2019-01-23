import React from "react"
import styled from "styled-components"

import PuffIcon from "../icons/Puff"

const Dimmer = styled.div`
  background: rgba(0, 0, 0, 0.25);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 8;
`

const Spinner = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  z-index: 9;
  border-radius: 10px;
  box-shadow: 0px 8px 24px rgba(13, 13, 18, 0.04);
  background: white;

  span {
    margin-bottom: 20px;
  }
`

const Pending = () => (
  <>
    <Spinner>
      <span>Please wait...</span>
      <PuffIcon />
    </Spinner>
    <Dimmer />
  </>
)

export default Pending
