import React, { Component } from "react"
import { connect } from "react-redux"

import NewTrip from "../../Presentational/NewTrip"
import { createTrip } from "../../../redux/actions/trips"

class NewTripContainer extends Component {
  submitTrip = values => {
    // debugger
    console.log("SUBMITTING TRIP! VALUES: \n", values)
    this.props.createTrip({ ...values })
  }

  render() {
    // return <NewTrip createTrip={this.submitTrip} />
    return <NewTrip />
  }
}

const mapDispatchToProps = { createTrip }

export default connect(
  null,
  mapDispatchToProps
)(NewTripContainer)
