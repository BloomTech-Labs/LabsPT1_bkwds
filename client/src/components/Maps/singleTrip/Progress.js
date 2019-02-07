import React from "react"
import Styled from "styled-components"
import { ProgressBar, Step } from "react-step-progress-bar"
import { media } from "../../../styles/theme/mixins"

const ProgressPanel = Styled.div`
    background:#f4f4f4;
    position:absolute;
    width:75%;
    max-width:700px;
    z-index:4;
    left:0;
    height:110px;
    right:0;
    height:100px;
    margin-left:auto;
    margin-right:auto;
    ${media.tablet`
       display:none;
  `}
`
const MobileProgressPanel = Styled(ProgressPanel)`
  display:none;
${media.tablet`
        display:block;
        top:0;
        left:50px;
        height:10%;
        max-height:110px;
        min-height:4rem;
        width: calc(100% - 50px);
`}

`

const PanelHeader = Styled.h4`
    padding: .5rem 2rem;
        ${media.tablet`
      padding: .25rem 2rem 0rem 1rem;

  `}
          ${media.phone`
      padding: .25rem 1rem 0rem 1rem;

  `}
    
`
const ProgressBarContainer = Styled.div`
    width:85%;
    margin: 1rem auto;

`

const StepContainer = Styled.div`
    background: ${props => (props.accomplished ? "#f26a20" : "white")};
    color:${props => (props.accomplished ? "white" : "black")};
    display:flex;
    align-items:center;
    justify-content:center;
    width:1.5rem;
    height:1.5rem;
    border-radius:50%;
`
let calcPercentage = waypoints => {
  let index = 0
  let val = 100 / waypoints.length

  for (let i = 0; i < waypoints.length; i++) {
    if (!waypoints[i].complete) {
      index = i
      break
    }
    index = waypoints.length
  }
  return val * index
}
export const Progress = props => {
  if (props.waypoints) {
    return (
      <div>
        <MobileProgress name={props.name} waypoints={props.waypoints} />
        <ProgressPanel>
          <PanelHeader>{props.name}</PanelHeader>
          <ProgressBarContainer>
            <ProgressBar
              filledBackground="linear-gradient(to right,#73c8a9, #373b44)"
              percent={calcPercentage(props.waypoints)}
              height=".75rem"
            >
              {props.waypoints.map((_, i) => {
                return (
                  <Step key={i}>
                    {({ accomplished }) => (
                      <StepContainer accomplished={accomplished}>
                        {console.log(accomplished)}
                        {i + 1}
                      </StepContainer>
                    )}
                  </Step>
                )
              })}
            </ProgressBar>
          </ProgressBarContainer>
        </ProgressPanel>
      </div>
    )
  } else {
    return null
  }
}

export const MobileProgress = props => {
  return (
    <MobileProgressPanel>
      <PanelHeader>{props.name}</PanelHeader>
      <ProgressBarContainer>
        <ProgressBar
          filledBackground="linear-gradient(to right,#73c8a9, #373b44)"
          percent={calcPercentage(props.waypoints)}
          height=".75rem"
        />
      </ProgressBarContainer>
    </MobileProgressPanel>
  )
}
