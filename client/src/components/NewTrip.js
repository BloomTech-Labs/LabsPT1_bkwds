import React from "react"
import CreateTrip from "../components/Maps/createTrip"
// import * as s from "../styles/NewTrip.styles"
import NewTripForm from "./forms/NewTripForm"
// import WaypointForm from "./forms/WaypointForm"

//TODO - Move state  up to redux after finalizing createTrip flow
//TODO - Toggle eventHandler on Map when user clicks on add waypoint
//TODO -  Make waypoints clickable to enable delete/edit prompts - figure out user flow for this
class NewTrip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addingWaypoint: false
    }
  }
  render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "relative"
    }
    const formWrapper = {
      position: "absolute",
      zIndex: 10,
      top: "10px",
      right: "10px"
    }
    return (
      <div style={style}>
        <div style={formWrapper}>
          <NewTripForm />
        </div>
        <CreateTrip />
      </div>
    )
  }
}
// const NewTrip = () => {
//   return (
//     <s.NewTripStyles>
//       <div className="create-trip">
//         <h3>Create a new trip</h3>
//
//         <div className="new-trip-map">
//           <img src="/images/map_placeholder.gif" alt="trash" />
//         </div>
//         {/* <div className="waypoint-form-wrapper">
//           <WaypointForm />
//         </div> */}
//       </div>
//     </s.NewTripStyles>
//   )
// }

export default NewTrip
