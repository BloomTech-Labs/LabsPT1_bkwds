import React from "react"
import { connect } from "react-redux"

import Trip from "./Trip"
import { getTrips } from "../redux/actions/trips"

const Trips = ({ trips, getTrips }) => {
  if (!trips.length) return <div>No trips!</div>
  return (
    <div>
      <button onClick={getTrips}>Get trips</button>
      {trips.map(trip => (
        <Trip key={trip._id} trip={trip} />
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  trips: state.trips.trips
})

const mapDispatchToProps = { getTrips }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips)
