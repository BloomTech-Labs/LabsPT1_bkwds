import React, { Component } from "react"
import { connect } from "react-redux"

import Trip from "./Trip"
import { getTrips } from "../redux/actions/trips"
import { getTripsArray } from "../utils/selectors"

class Trips extends Component {
  componentDidMount() {
    this.props.getTrips()
  }

  render() {
    const { trips } = this.props
    return (
      <div>
        {!trips.length && "No unarchived trips!"}
        {trips.map(trip => (
          <Trip key={trip.id} trip={trip} archived={false} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  trips: getTripsArray(state)
})

const mapDispatchToProps = { getTrips }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips)
