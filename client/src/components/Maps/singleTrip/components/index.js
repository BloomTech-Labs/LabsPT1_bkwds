import styled from "styled-components"
import { media } from "../../../../styles/theme/mixins"

export const TripPanelStyles = styled.div`
  ${media.tablet`
    .hide-mobile {
      display: none;
    }
  `}

  .mobile-toggles {
    margin-left: 50px;
    background: white;
  }

  .mobile-trip-header {
    height: 50px;
    display: flex;
    & :first-child {
      display: flex;
      flex-grow: 1;
      height: 50px;
    }
    input {
      padding: 0;
      font-size: 1.35rem;
    }
    .trip-detail-wrapper {
      display: flex;
    }
  }

  .mobile-edit-waypoints {
  }
`

export const Panel = styled.div`
  max-width: 360px;
  min-width: 320px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  background: white;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  width: 30%;
  height: 45%;
  z-index: 5;
`

export const WaypointLabel = styled.label`
  margin: 0 1rem;
`

export const PanelHeader = styled.div`
  padding: 1.25rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
`

export const TripDetail = styled.div`
  margin-right: 1rem;
  align-items: center;
  display: flex;
  & > * {
    margin-right: 0.5rem;
  }
`
export const PanelSubheader = styled.div`
  padding: 0.75rem 1.25rem 1.25rem 1.25rem;
  display: flex;
`

export const DateLabel = styled.label`
  margin: 0.25rem 1.25rem;
  color: #808080;

  ${media.tablet`
    overflow-x: hidden;
  `}
`

export const Waypoint = styled.div`
  align-items: center;
  width: 90%;
  display: flex;
  margin: 0.5rem auto;
`
export const WaypointInput = styled.input`
  box-sizing: border-box;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: ${props =>
    props.edit ? ".15rem solid black" : ".15rem solid transparent"};
`
export const TripTitleInput = styled.input`
  box-sizing: border-box;
  font-size: 1.5rem;
  width: 80%;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 0.15rem solid black;
  border-bottom: ${props =>
    props.edit ? ".15rem solid black" : ".15rem solid transparent"};
`
export const EditButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
`
export const DeleteButton = styled.button`
  visibility: ${props => (!props.edit ? "hidden" : "visible")};
  background: none;
  color: inherit;
  border: none;
`
export const WaypointList = styled.div`
  overflow: scroll;
`

export const WaypointsHeader = styled.div`
  margin: 0 1rem 1rem 1rem;
  align-items: center;
  color: #808080;
  display: flex;
  width: 50%;
  justify-content: space-between;
  & h4 {
    font-size: 1.25rem;
    margin: 0;
  }
  & button {
    margin-left: 1rem;
  }
`

export const SaveButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
`
export const AddButton = styled.button`
  visibility: ${props => (!props.edit ? "hidden" : "visible")};
  border: 0;
  background: transparent;
`
export const StartButton = styled.button`
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
  background: #45569e;
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  color: white;
  width: 100px;
  border-radius: 5px;
`

export const WaypointTracker = styled.ul`
  padding: 8px;
`

export const WaypointStepper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & button: {
    border: none;
    border-radius: 50%;
  }
`
