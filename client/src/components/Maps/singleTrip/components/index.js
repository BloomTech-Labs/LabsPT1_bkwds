import styled, { css } from "styled-components"
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
      margin-top: 0;
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

  .panel-wrapper {
    /* height: 345px; */
    background: white;
  }

  .waypoint-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0 1rem;
  }

  .trip-actions-wrapper {
    margin: 0 1rem 1rem 1rem;
    display: flex;
    justify-content: space-between;
    height: 40px;
  }

  span.chevron-icon {
    position: absolute;
    top: 0.25rem;
    left: 0.5rem;
    height: 1.5rem;
    width: 1.5rem;
  }

  #plus-icon {
    z-index: 3;
    bottom: 80px;
  }

  /* BOOTSTRAP OVERRIDES */
  .accordion__title {
    padding: 10px 15px;
    h4 {
      margin-bottom: 0;
    }
  }
  .accordion__body {
    padding: 8px 0 5px 10px;
  }
`

export const Panel = styled.div`
  max-width: 340px;
  min-width: 320px;
  border-radius: 0 0 0 2px;
  display: flex;
  flex-direction: column;
  background: white;
  position: absolute;
  right: 0;
  top: 0;
  width: 30%;
  height: 45%;
  z-index: 5;

  ${props => props.isHidden && isHiddenStyles}
`

const isHiddenStyles = css`
  width: 60px;
  min-width: unset;
  .panel-wrapper {
    visibility: hidden;
  }
  span.chevron-icon {
    top: 0.35rem;
    left: 0.525rem;
    height: 2.5rem;
    width: 2.5rem;
  }
  .marker-icon-wrapper {
    position: absolute;
    bottom: 12px;
    left: 1.25rem;
    i {
      font-size: 2rem;
    }
  }
`

export const ActivePanel = styled.div`
  position: absolute;
  z-index: 2;
  top: 8rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  width: 30%;
  max-width: 380px;
  min-width: 320px;
  background: white;
  height: 400px;
  overflow: scroll;
  ${media.tablet`
  display:none;
`}
`

export const MobileActivePanel = styled(ActivePanel)`
  ${media.tablet`
    display:block;
    top:120px;
    left:50px;
    right:0;
    margin-left:0;
    margin-right:0;
`}
`
export const MobileButton = styled.button`
  display: none;
  ${media.tablet`
  width:50px;
  display:block;
  height:50px;
  border-radius:50%;
  background:white;
  position:absolute;
`}
`

export const WaypointLabel = styled.label`
  margin: 0 1rem 0 0;
`

export const PanelHeader = styled.div`
  margin: 1.375rem 0 0 0;
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 1rem 1rem 0;
  ${media.tablet`
    padding: 1rem;
  `}
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
  padding: 0.5rem 1.25rem 1.25rem 1.25rem;
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
  width: 65%;
  display: flex;
  /* margin: 0.5rem auto; */
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
  /* height: 124px; */
  height: 300px;
  overflow: scroll;
  ${media.tablet`
    height: 100%;
  `}
`

export const WaypointsHeader = styled.div`
  margin: 0 1rem 0.5rem 1rem;
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

export const TripButton = styled.button`
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
  background: #45569e;
  color: white;
  width: 140px;
  border-radius: 5px;
  border: 0;
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
