import Styled from "styled-components"
import { media } from "../../../../styles/theme/mixins"

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
    padding:1.25rem;
    align-items:center;
    justify-content:space-between;
    display:flex;
`

export const TripDetail = Styled.div`
    margin-right:1rem;
    align-items:center;
    display:flex;
    & > * {
        margin-right:.5rem;
    }
`
export const PanelSubheader = Styled.div`
    padding:.75rem 1.25rem 1.25rem 1.25rem;
    display:flex;
`

export const DateLabel = Styled.label`
    margin: 0.25rem 1.25rem;
    color: #808080;

    ${media.tablet`
    overflow-x: hidden;
    `}
`

export const Waypoint = Styled.div`
    align-items:center;
    width: 90%;
    display:flex;
    margin: .5rem auto;
`

export const WaypointTracker = Styled.ul`
    padding: 8px;
`

export const WaypointStepper = Styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & button: {
        border: none;
        border-radius: 50%;
    }
`
