import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { TripPropTypes } from "./propTypes"

import TripCard from "./TripCard"
import { getTrips } from "../redux/actions/trips"
import { getTripsArray } from "../utils/selectors"
import * as s from "../styles/TripCard.styles"
import AddTripButton from "./AddTripButton"

class Trips extends Component {
  componentDidMount() {
    this.props.getTrips()
  }

  renderTrips() {
    const { trips, loading } = this.props

    return (
      <div>
        <s.TripCardStyles>
          {loading ? (
            "Loading..."
          ) : (
            <div className="container">
              {!trips.length && "No unarchived trips!"}
              {trips.map(trip => (
                <TripCard key={trip.id} trip={trip} archived={false} />
              ))}
              <AddTripButton
                className="AddTripButton"
                text={trips.length ? "Add New Trip" : "Add Your First Trip"}
              />
            </div>
          )}
        </s.TripCardStyles>
      </div>
    )
  }

  render() {
    return <div className="firstTrip">{this.renderTrips()}</div>
  }
}

Trips.propTypes = {
  getTrips: PropTypes.func.isRequired,
  trips: PropTypes.arrayOf(TripPropTypes)
}

const mapStateToProps = state => ({
  trips: getTripsArray(state),
  loading: state.trips.loading
})

const mapDispatchToProps = { getTrips }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips)
