import React, { Component } from "react"
import { connect } from "react-redux"

import Trip from "./Trip"
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
          {trips.length > 0 ? (
            trips.map(trip => (
              <Trip key={trip.id} trip={trip} archived={false} />
            ))
          ) : (
            <div>No trips!</div>
          )}
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
