import styled from "styled-components"
import { media } from "./theme/mixins"

export const CreateTripPanelStyles = styled.div`
  .panel-input-wrapper {
    margin: 0.25rem 0;
    input {
      padding: 0 0.25rem;
      width: 100%;
    }
    ${media.tablet`
      margin: 0;
      input {
        text-align: left;
        padding-left: 1rem;
      }
    `}
  }

  .DateRangePicker {
    display: flex;
    justify-self: center;
    width: 90%;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.5);
    ${media.tablet`
      width: 100%;
      border: 0;
      background: transparent;
    `}
  }

  .DateRangePickerInput {
    background: rgba(255, 255, 255, 0.5);
    width: 100%;
    ${media.tablet`
      background: white;
    `}
  }

  .close-trip-settings {
    display: none;

    ${media.tablet`
      display: ${props => (props.menuToggled ? "flex" : "none")};
      justify-content: center;
      border-radius: 0;
      /* background:  */
      height: 50px;
      width: 100%;
      max-width: 286px;
      margin: 0;
      padding: 0;
    `}
  }

  ${media.tablet`
    .hide-mobile {
      display: none;
    }
  `}
`

export const Panel = styled.div`
  max-width: 360px;
  min-width: 320px;
  width: 100%;
  height: 45%;
  border-radius: 2px;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  background: white;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  z-index: 5;

  ${media.tablet`
    max-width: 100%;
    width: 100%;
    height: ${props => (props.menuToggled ? "100vh" : "50px")};
    top: 0;
    left: 50px;
    border-radius: 0;
    position: absolute;
    background: ${props =>
      props.menuToggled ? "rgba(0,0,0,0.5)" : "transparent"};
    overflow-x: hidden;
    justify-content: ${props => (props.menuToggled ? "flex-start" : "center")};
    align-items: ${props => (props.menuToggled ? "space-between" : "center")};

  `}
`

export const ButtonGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;

  ${media.tablet`
    display: ${props => (props.menuToggled ? "flex" : "none")};
    position: static;
    flex-direction: column;
    overflow-x: hidden;
    margin: 0;
  `}
`

export const SaveButton = styled.button`
  color: white;
  width: 105px;
  border-radius: 4px;
  background: ${props => props.theme.primaryDark};
  border: none;
  cursor: pointer;
  width: 100%;
  flex: 1;
  margin-top: 15px;

  &.disabledButton {
    background-color: grey;
  }

  ${media.tablet`
    /* display: ${props => (props.menuToggled ? "flex" : "none")}; */
    display: none;
    justify-content: center;
    border-radius: 0;
    /* background:  */
    height: 50px;
    padding: 0;
    width: 100%;
    max-width: 286px;
  `}
`

export const WaypointAddAction = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`

export const WaypointButton = styled.button`
  color: white;
  background: ${props => props.theme.primaryDark};
  border: none;
  cursor: pointer;
  border-radius: 4px;
  width: 105px;
`

export const PanelHeader = styled.h2`
  font-size: 1.5rem;
`

export const DateLabel = styled.label`
  margin: 0.25rem 0;
  color: #808080;

  ${media.tablet`
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
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 0.15rem solid black;

  ${media.tablet`
    display: ${props => (props.menuToggled ? "flex" : "none")};
    background: ${props =>
      props.searchToggled || props.menuToggled ? "white" : "transparent"};
    text-align: center;
    height: 45px;
    margin: 0;
    border: 1px solid black;
    justify-self: center;
    align-self: center;
    border: 0;
    max-width: 286px;
  `}
`

export const InputLabel = styled.label`
  width: 85%;
  margin: 0 auto;
  color: #808080;
`

export const SearchWrapper = styled.div`
  ${media.tablet`
    background-color: ${props =>
      props.searchToggled ? "white" : "transparent"};
    min-height: 50px;
    width: 100%;
    margin: 0;
  `}
`

export const SearchCenterInput = styled.input`
  /* display: none; */
  margin: 0.25rem auto;
  width: 85%;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 0.15rem solid black;

  ${media.tablet`
    text-align: center;
    border: 0;
    margin: 0;
    height: 50px;
    justify-self: center;
    align-self: center;
    visibility: hidden;

    position: ${({ searchToggled }) =>
      searchToggled ? "absolute" : "inherit"};
    top: ${({ searchToggled }) => (searchToggled ? "0" : "unset")};
    left: ${({ searchToggled }) => (searchToggled ? "0" : "unset")};
    visibility: ${props => (props.searchToggled ? "visible" : "hidden")};
    z-index: ${props => (props.searchToggled ? "2000" : "inherit")};
  `}
`

export const DateRangeStyle = styled.div`
  ${media.tablet`
    display: ${props => (props.menuToggled ? "flex" : "none")};
    width: 85%;
    border: 0;
    margin: 0;
    justify-content: center;
    align-content: center;
  `}
  .DateRangePicker {
    width: 100%;
    margin: 0;
    & > div {
      width: 100%;
      & > div {
        width: 100%;
      }
    }
  }
  .DateRangePickerInput {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & input {
      font-family: Wals;
      font-size: 16px;
      text-align: center;
      border-bottom: none;
      font-weight: 400;
    }
    & input:focus,
    & input:active {
      border-bottom: 2px solid ${props => props.theme.primaryDark};
    }
  }
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
