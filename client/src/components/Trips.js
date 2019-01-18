import React, { Component } from "react"
import { connect } from "react-redux"

import TripCard from "./TripCard"
import * as s from "../styles/TripCard.styles"
import AddTripButton from "./AddTripButton"

class Trips extends Component {
  renderTrips() {
    const { trips } = this.props

    return (
      <div>
        <s.TripCardStyles>
          <div className="container">
            {!trips.length && "No unarchived trips!"}
            {trips.map(trip => {
              if (!trip.isArchived) {
                return <TripCard key={trip.id} trip={trip} />
              }
            })}
            <AddTripButton
              className="AddTripButton"
              text={trips.length ? "Add New Trip" : "Add Your First Trip"}
            />
          </div>
        </s.TripCardStyles>
      </div>
    )
  }

  render() {
    return <div className="firstTrip">{this.renderTrips()}</div>
  }
}

const mapStateToProps = state => ({
  trips: state.auth.user.trips
})

export default connect(mapStateToProps)(Trips)
