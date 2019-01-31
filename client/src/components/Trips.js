import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getTripsArray } from "../utils/selectors"
import { getTrips } from "../redux/actions/trips"
import { TripPropTypes } from "./propTypes"
import TripCard from "./TripCard"
import AddTripButton from "./AddTripButton"
import * as s from "../styles/TripCard.styles"

class Trips extends Component {
  static propTypes = {
    getTrips: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    trips: PropTypes.arrayOf(TripPropTypes),
    userId: PropTypes.string
  }

  componentDidMount() {
    const { getTrips, userId } = this.props
    getTrips(userId)
  }

  renderPlaceholders = () =>
    [...Array(5)].map((_, i) => (
      <TripCard archived={false} key={i} loading={true} />
    ))

  renderTrips = () => {
    const { loading, trips } = this.props

    return trips.map(
      trip =>
        trip.isArchived || (
          <TripCard
            archived={false}
            key={trip.id}
            loading={loading}
            trip={trip}
          />
        )
    )
  }

  render() {
    const { loading, trips } = this.props

    return (
      <div>
        <s.TripCardStyles>
          <div className="container">
            <AddTripButton
              className="AddTripButton"
              text={trips.length ? "Add New Trip" : "Add Your First Trip"}
            />
            {loading ? this.renderPlaceholders() : this.renderTrips()}
          </div>
        </s.TripCardStyles>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  trips: getTripsArray(state),
  loading: state.trips.pending
})

export default connect(
  mapStateToProps,
  { getTrips }
)(Trips)
