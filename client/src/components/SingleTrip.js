import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import TripDetails from "./TripDetails"
import { getSingleTrip } from "../redux/actions/trips"
import { getTripById } from "../utils/selectors"

class SingleTrip extends Component {
  componentDidMount() {
    this.props.getSingleTrip(this.props.tripId)
  }

  render() {
    const { trip, tripId } = this.props
    return (
      <div>
        <div>Single Trip View component here! {tripId}</div>
        <TripDetails trip={trip} />
        <Link to="/app/trips">← Back to All Trips</Link>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  trip: getTripById(state, ownProps.tripId)
})

const mapDispatchToProps = { getSingleTrip }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTrip)
