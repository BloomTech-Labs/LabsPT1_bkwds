import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { deleteTrip } from "../redux/actions/trips"
import { getSingleTrip } from "../redux/actions/trips"

class TripCard extends Component {
  handleSingleTrip = tripId => e => {
    e.preventDefault()
    this.props.getSingleTrip(tripId)
  }

  render() {
    const { trip } = this.props
    return (
      <div>
        {!trip.id && "Loading trip"}
        {trip.id && (
          <>
            <div key={trip.id} trip={trip} className="card">
              <Link
                to={`/trip/get/${trip.id}`}
                onClick={this.handleSingleTrip(trip)}
              >
                <div className="card-image">
                  <img
                    src="https://staticmapmaker.com/img/google.png"
                    alt="Google Map of Albany, NY"
                  />
                </div>
                <div className="card-content">
                  <div>{trip.name}</div>
                  <div>Start: {trip.start}</div>
                  <div>End: {trip.end}</div>
                </div>
              </Link>
            </div>
            <br />
          </>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = { deleteTrip, getSingleTrip }

export default connect(
  null,
  mapDispatchToProps
)(TripCard)
