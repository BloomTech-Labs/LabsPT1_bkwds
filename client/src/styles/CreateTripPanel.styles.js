import Styled from "styled-components"
import { media } from "./theme/mixins"

export const Panel = Styled.div`
    max-width:360px;
    min-width:320px;
    border-radius: .5rem;
    display:flex;
    flex-direction:column;
    background:white;
    position:absolute;
    right:1.5rem;
    top:1.5rem;
    width:30%;
    height:45%;
    z-index:5;

    ${media.tablet`
      max-width: 100%;
      width: 100%;
      height: ${props => (props.isToggled ? "50%" : "6%")};
      top: 0px;
      right: 0px;
      background: ${props =>
        props.isToggled ? "white" : "rgba(255, 255, 2555, 0.5)"};
      border-radius: 0;
      position: absolute;
      overflow-x: hidden;
      justify-content: ${props =>
        props.isToggled ? "space-between" : "center"};
      align-items: ${props => (props.isToggled ? "space-between" : "center")};
    `}

    #plus-icon{
      visibility: hidden;

      ${media.tablet`
        visibility: visible;
        position: absolute;
        right: 5%;
        bottom: 50%;
        color: rgba(108, 122, 137, .8)
      `}
    }
`

export const ButtonGroup = Styled.div`
    display:flex;
    justify-content:space-around;
    position:absolute;
    bottom:1rem;
    width:95%;
    margin: 0 auto;

    ${media.tablet`
      display: ${props => (props.isToggled ? "flex" : "none")};
      position: static;
      justify-content: initial;
      overflow-x: hidden;
    `}

`
export const SaveButton = Styled.button`
    color:white;
    width: 105px;
    border-radius:4px;
    background: #0e153f;

    ${media.tablet`
      display: ${props => (props.isToggled ? "flex" : "none")};
      position: static;
      bottom: auto;
      border: 1px solid black;
      margin: 0 auto;
    `}
`

export const WaypointButton = Styled.button`
    color:white;
    background: #0e153f;
    border-radius: 4px;
    width:105px;

    ${media.tablet`display:none;`}

`
export const PanelHeader = Styled.h2`
    font-size:1.5rem;
    padding:.5rem;

    ${media.tablet`display: none;`}
`
export const DateLabel = Styled.label`
    margin:.5rem auto 0rem auto;
    color: #808080;

    ${media.tablet`
      display: none;
      overflow-x: hidden;
    `}


`
export const WaypointList = Styled.div`

    ${media.tablet`
      display: none;
      overflow-x: hidden;
    `}
`

export const Waypoint = Styled.div`
    align-items:center;
    width: 90%;
    display:flex;
    margin:0 auto;
`
export const TripTitleInput = Styled.input`
    margin: .25rem auto 1.25rem auto;
    width:85%;
    border:0;
    outline:0;
    background:transparent;
    border-bottom: .15rem solid black;

    ${media.tablet`
      display: ${props => (props.isToggled ? "flex" : "none")};
      text-align: center;
      height: 45px;
      margin: 0;
      border: 1px solid black;
      justify-self: center;
      align-self: center;
    `}

`
export const InputLabel = Styled.label`
    width:85%;
    margin: 0 auto;
    color: #808080;

    ${media.tablet`display: none;`}
`

export const WaypointLabel = Styled.label`
    margin:.25rem auto 1rem auto;
    color: #808080;

    ${media.tablet`display: none;`}

`
export const WaypointInput = Styled.input`
    margin: 0 .5rem;
    border:0;
    outline:0;
    background:transparent;
    border-bottom: .15rem solid black;

    ${media.tablet`display: none;`}

`

export const SearchCenterInput = Styled.input`
    margin: .25rem auto 1.25rem auto;
    width:85%;
    border:0;
    outline:0;
    background:transparent;
    border-bottom:.15rem solid black;

    ${media.tablet`
      text-align: center;
      margin: 0;
      border: 1px solid black;
      justify-self: center;
      align-self: center;
      height: 45px;

    `}

`

export const DateRangeStyle = Styled.div`
  ${media.tablet`
    display: ${props => (props.isToggled ? "flex" : "none")};
    width: 85%;
    border: 1px solid black;
    justify-content: center;
    align-content: center;
    margin: 0 auto;
    `}
`

export const Toggle = Styled.div`
  display: flex;
  visibility: hidden;
  justify-content: center;
  overflow: hidden;

  ${media.tablet`
    visibility: visible;
  `}

`
