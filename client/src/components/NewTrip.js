import React from "react"
import CreateTrip from "../components/Maps/createTrip"
// import * as s from "../styles/NewTrip.styles"
// import NewTripForm from "./forms/NewTripForm"
// import WaypointForm from "./forms/WaypointForm"

//TODO - Move state  up to redux after finalizing createTrip flow
//TODO - Toggle eventHandler on Map when user clicks on add waypoint
//TODO -  Make waypoints clickable to enable delete/edit prompts - figure out user flow for this
class NewTrip extends React.Component {
  render() {
    return <CreateTrip />
  }
}

export default NewTrip
