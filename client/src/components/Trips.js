import React, { Component } from "react"
import { connect } from "react-redux"

import TripCard from "./Trip"
import { getTrips } from "../redux/actions/trips"
import { getTripsArray } from "../utils/selectors"
import * as s from "../styles/Trip.styles"

class Trips extends Component {
  componentDidMount() {
    this.props.getTrips()
  }

  render() {
    const { trips } = this.props
    return (
      <s.TripStyles>
        <div className="container">
          {!trips.length && "No unarchived trips!"}
          {trips.map(trip => (
            <TripCard key={trip.id} trip={trip} archived={false} />
          ))}
        </div>
      </s.TripStyles>
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
