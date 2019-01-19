import React, { Component } from "react"
import { connect } from "react-redux"
import { getTrips } from "../redux/actions/trips"
import PropTypes from "prop-types"
import { TripPropTypes } from "./propTypes"

import TripCard from "./TripCard"
import * as s from "../styles/TripCard.styles"
import AddTripButton from "./AddTripButton"
import { getTripsArray } from "../utils/selectors"

class Trips extends Component {
  componentDidMount() {
    this.props.getTrips(this.props.user)
  }

  render() {
    const { trips } = this.props
    return (
      <div>
        <s.TripCardStyles>
          <div className="container">
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
}

Trips.propTypes = {
  getTrips: PropTypes.func.isRequired,
  trips: PropTypes.arrayOf(TripPropTypes)
}

const mapStateToProps = state => ({
  user: state.auth.user.id,
  trips: getTripsArray(state),
  loading: state.trips.loading
})

const mapDispatchToProps = { getTrips }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips)
