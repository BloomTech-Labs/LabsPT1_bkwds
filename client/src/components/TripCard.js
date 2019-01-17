import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { TripPropTypes } from "./propTypes"
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
            <div className="card">
              <Link to="/trip/:tripId" onClick={this.handleSingleTrip(trip)}>
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

TripCard.propTypes = {
  archived: PropTypes.bool.isRequired,
  deleteTrip: PropTypes.func.isRequired,
  getSingleTrip: PropTypes.func.isRequired,
  trip: TripPropTypes
}

const mapDispatchToProps = { deleteTrip, getSingleTrip }

export default connect(
  null,
  mapDispatchToProps
)(TripCard)
