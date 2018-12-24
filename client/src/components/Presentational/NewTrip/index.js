import React, { Component } from "react"
import { connect } from "react-redux"

import * as s from "./styles"
import NewTripForm from "../../forms/NewTripForm"
// import WaypointForm from "../../forms/WaypointForm"
import { createTrip } from "../../../redux/actions/trips"

// const NewTrip = ({ createTrip }) => {
class NewTrip extends Component {
  submitTrip = values => {
    // debugger
    console.log("SUBMITTING TRIP! VALUES: \n", values)
    this.props.createTrip({ ...values })
  }

  render() {
    return (
      <s.NewTripStyles>
        <div className="create-trip">
          <h3>Create a new trip</h3>
          <div className="new-trip-form-wrapper">
            <NewTripForm onSubmit={this.submitTrip} />
            {/* <NewTripForm /> */}
          </div>
          <div className="new-trip-map">
            <img src="/images/map_placeholder.gif" alt="trash" />
          </div>
          {/* <div className="waypoint-form-wrapper">
            <WaypointForm onSubmit={() => alert("waypoint form submitted!")} />
          </div> */}
        </div>
      </s.NewTripStyles>
    )
  }
}

const mapDispatchToProps = { createTrip }

export default connect(
  null,
  mapDispatchToProps
)(NewTrip)

// export default NewTrip
