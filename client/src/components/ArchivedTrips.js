import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import TripCard from "./TripCard"
import * as s from "../styles/TripCard.styles"
import { getTrips } from "../redux/actions/trips"
import { getTripsArray } from "../utils/selectors"
import { TripPropTypes } from "./propTypes"

class ArchivedTrips extends Component {
  static propTypes = {
    getTrips: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    trips: PropTypes.arrayOf(TripPropTypes),
    userId: PropTypes.string.isRequired
  }

  state = {
    archivedExists: false
  }

  componentDidMount() {
    const { getTrips, userId } = this.props
    getTrips(userId)
  }

  componentDidUpdate(prevProps, prevState) {
    const archivedExists = this.props.trips.some(trip => trip.isArchived)
    if (!prevState.archivedExists && archivedExists) {
      this.setState({ archivedExists })
    }
  }

  renderPlaceholders = () =>
    this.props.trips
      .filter(trip => trip.isArchived)
      .map((_, i) => <TripCard archived key={i} loading />)

  renderArchivedTrips = () => {
    const { loading, trips } = this.props

    return trips.map(trip =>
      trip.isArchived ? (
        <TripCard archived key={trip.id} loading={loading} trip={trip} />
      ) : null
    )
  }

  render() {
    const { loading } = this.props
    const { archivedExists } = this.state

    return (
      <s.TripCardStyles>
        <div className="container">
          {loading
            ? this.renderPlaceholders()
            : archivedExists
            ? this.renderArchivedTrips()
            : "No Archived Trips"}
        </div>
      </s.TripCardStyles>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.trips.pending,
  trips: getTripsArray(state),
  userId: state.auth.user.id
})

export default connect(
  mapStateToProps,
  { getTrips }
)(ArchivedTrips)
