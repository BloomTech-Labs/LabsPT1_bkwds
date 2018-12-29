import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Trip from "./Trip"
import { getSingleTrip } from "../redux/actions/trips"

class SingleTrip extends Component {
  componentDidMount() {
    this.props.getSingleTrip(this.props.tripId)
  }

  render() {
    const { trip, tripId } = this.props
    return (
      <div>
        <div>Single Trip View component here! {tripId}</div>
        {trip && <Trip trip={trip} />}
        <Link to="/app/trips">← Back to All Trips</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  trip: state.trips.activeTrip
})

const mapDispatchToProps = { getSingleTrip }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTrip)
