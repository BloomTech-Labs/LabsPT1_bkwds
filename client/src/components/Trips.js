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
    this.props.getTrips(this.props.userId)
  }

  render() {
    const { trips } = this.props
    return (
      <div>
        <s.TripCardStyles>
          <div className="container">
            <AddTripButton
              className="AddTripButton"
              text={trips.length ? "Add New Trip" : "Add Your First Trip"}
            />
            {trips.map(trip => {
              if (!trip.isArchived) {
                return <TripCard key={trip.id} trip={trip} archived={false} />
              } else return null
            })}
          </div>
        </s.TripCardStyles>
      </div>
    )
  }
}

Trips.propTypes = {
  getTrips: PropTypes.func.isRequired,
  trips: PropTypes.arrayOf(TripPropTypes),
  userId: PropTypes.string
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  trips: getTripsArray(state),
  loading: state.trips.loading
})

const mapDispatchToProps = { getTrips }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips)
