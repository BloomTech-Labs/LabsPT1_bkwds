import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import TripCard from "./TripCard"
import * as s from "../styles/TripCard.styles"
import { getTrips } from "../redux/actions/trips"
import { getTripsArray } from "../utils/selectors"
import { TripPropTypes } from "./propTypes"

class ArchivedTrips extends Component {
  state = {
    archivedExists: false
  }
  componentDidMount() {
    this.props.getTrips(this.props.userId)

    this.props.trips.forEach(trip => {
      if (trip.isArchived) {
        this.setState({ archivedExists: true })
        return
      }
    })
  }

  render() {
    const { trips, loading } = this.props
    const { archivedExists } = this.state
    return (
      <s.TripCardStyles>
        {loading ? (
          "Loading..."
        ) : (
          <div className="container">
            {archivedExists ? null : "No Archived Trips"}
            {trips.map(trip => {
              if (trip.isArchived) {
                return <TripCard key={trip.id} trip={trip} archived={true} />
              } else return null
            })}
          </div>
        )}
      </s.TripCardStyles>
    )
  }
}

ArchivedTrips.propTypes = {
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  getTrips: PropTypes.func.isRequired,
  trips: PropTypes.arrayOf(TripPropTypes)
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
)(ArchivedTrips)
