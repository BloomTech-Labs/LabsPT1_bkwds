import Styled from "styled-components"

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
`

export const WaypointLabel = Styled.label`
margin: 0 1rem;
`

export const PanelHeader = Styled.div`
  padding:1.1rem;
  align-items:center;
  justify-content:space-between;
  display:flex;

`
export const Waypoint = Styled.div`
  align-items:center;
  width: 90%;
  display:flex;
  margin: .5rem auto;
`
export const WaypointInput = Styled.input`
  box-sizing:border-box;
  border:0;
  outline:0;
  background:transparent;
  border-bottom: ${props =>
    props.edit ? ".15rem solid black" : ".15rem solid transparent"};
`
export const TripTitleInput = Styled.input`
  box-sizing:border-box;
  font-size: 1.5rem;
  width:75%;
  border:0;
  outline:0;
  background:transparent;
  border-bottom: .15rem solid black;
  border-bottom: ${props =>
    props.edit ? ".15rem solid black" : ".15rem solid transparent"};
`
export const EditButton = Styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
`
export const DeleteButton = Styled.button`
    visibility: ${props => (!props.edit ? "hidden" : "visible")};
    background: none;
    color: inherit;
    border: none;
`
export const WaypointList = Styled.div`
  overflow:scroll;
`

export const WaypointsHeader = Styled.div`
    margin: 0 1rem 1rem 1rem;
    align-items:center;
    color:#808080;
    display:flex;
    width:50%;
    justify-content:space-between;
    & h4 {
        font-size:1.25rem;
        margin: 0;
    }
    & button {
        margin-left: 1rem;
    }
`

export const SaveButton = Styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
`
export const AddButton = Styled.button`
    visibility: ${props => (!props.edit ? "hidden" : "visible")};
    border:0;
    background:transparent;
`
export const StartButton = Styled.button`
    box-shadow: 0 0 15px 0 rgba(0,0,0,0.15);
    background:#45569e;
    position:absolute;
    bottom:1.5rem;
    right:1.5rem;
    color:white;
    width:100px;
    border-radius:5px;
`
