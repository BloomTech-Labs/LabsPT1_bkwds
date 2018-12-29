import React, { Component } from "react"
import { connect } from "react-redux"

import NewTrip from "../components/NewTrip"
import { createTrip } from "../redux/actions/trips"

class NewTripContainer extends Component {
  submitTrip = values => {
    this.props.createTrip({ ...values })
  }

  render() {
    return <NewTrip createTrip={this.submitTrip} />
  }
}

const mapDispatchToProps = { createTrip }

export default connect(
  null,
  mapDispatchToProps
)(NewTripContainer)
