import styled from "styled-components"
import { media } from "./theme/mixins"

export const CreateTripPanelStyles = styled.div`
  .mobile-create-trip-panel {
    display: none;
  }

  ${media.tablet`
    .mobile-create-trip-panel {
      display: block;
    }
  `}

  ${media.tablet`
    .desktop-create-trip-panel {
      display: none;
    }
  `}

  .DateRangePicker {
    display: flex;
    justify-self: center;
    width: 90%;
    margin: 0 auto;
    background: rgba(255, 255, 2555, 0.5);
  }

  .DateRangePickerInput {
    background: rgba(255, 255, 2555, 0.5);
    width: 100%;
  }
`

export const Panel = styled.div`
  max-width: 360px;
  min-width: 320px;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  background: white;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  width: 30%;
  height: 45%;
  z-index: 5;

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
    justify-content: ${props => (props.isToggled ? "space-between" : "center")};
    align-items: ${props => (props.isToggled ? "space-between" : "center")};
  `}
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 1rem;
  width: 95%;
  margin: 0 auto;

  ${media.tablet`
    display: ${props => (props.isToggled ? "flex" : "none")};
    position: static;
    justify-content: initial;
    overflow-x: hidden;
  `}
`

export const SaveButton = styled.button`
  color: white;
  width: 105px;
  border-radius: 4px;
  background: ${props => props.theme.primaryDark};
  border-color: ${props => props.theme.primaryDark};
  cursor: pointer;

  ${media.tablet`
    display: ${props => (props.isToggled ? "flex" : "none")};
    position: static;
    bottom: auto;
    border: 1px solid black;
    margin: 0 auto;
  `}
`

export const WaypointButton = styled.button`
  color: white;
  background: ${props => props.theme.primaryDark};
  border-color: ${props => props.theme.primaryDark};
  cursor: pointer;
  border-radius: 4px;
  width: 105px;

  ${media.tablet`
    display: none;
  `}
`

export const PanelHeader = styled.h2`
  font-size: 1.5rem;
  padding: 0.5rem;

  ${media.tablet`display: none;`}
`

export const DateLabel = styled.label`
  margin: 0.5rem auto 0rem auto;
  color: #808080;

  ${media.tablet`
    display: none;
    overflow-x: hidden;
  `}
`

export const WaypointList = styled.div`
  ${media.tablet`
    display: none;
    overflow-x: hidden;
  `}
`

export const Waypoint = styled.div`
  align-items: center;
  width: 90%;
  display: flex;
  margin: 0 auto;
`

export const TripTitleInput = styled.input`
  margin: 0.25rem auto 1.25rem auto;
  width: 85%;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 0.15rem solid black;

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

export const InputLabel = styled.label`
  width: 85%;
  margin: 0 auto;
  color: #808080;

  ${media.tablet`display: none;`}
`

export const WaypointLabel = styled.label`
  margin: 0.25rem auto 1rem auto;
  color: #808080;

  ${media.tablet`display: none;`}
`

export const WaypointInput = styled.input`
  margin: 0 0.5rem;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 0.15rem solid black;

  ${media.tablet`
    display: none;
  `}
`

export const SearchCenterInput = styled.input`
  /* display: none; */
  margin: 0.25rem auto 1.25rem auto;
  width: 85%;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 0.15rem solid black;

  ${media.tablet`
    text-align: center;
    margin: 0;
    border: 1px solid black;
    justify-self: center;
    align-self: center;
    height: 45px;
    visibility: hidden;

  `}
`

export const DateRangeStyle = styled.div`
  ${media.tablet`
    display: ${props => (props.isToggled ? "flex" : "none")};
    width: 85%;
    border: 1px solid black;
    justify-content: center;
    align-content: center;
    margin: 0 auto;
  `}
`

export const Toggle = styled.div`
  display: flex;
  visibility: hidden;
  justify-content: center;
  overflow: hidden;

  ${media.tablet`
    visibility: visible;
  `}
`
