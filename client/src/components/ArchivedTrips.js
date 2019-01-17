import React, { Component } from "react"
import { connect } from "react-redux"

import TripCard from "./TripCard"
import * as s from "../styles/TripCard.styles"
import { getArchivedTrips } from "../redux/actions/trips"
import { getTripsArray } from "../utils/selectors"

class ArchivedTrips extends Component {
  componentDidMount() {
    this.props.getArchivedTrips()
  }

  render() {
    const { trips, loading } = this.props
    return (
      <s.TripCardStyles>
        {loading ? (
          "Loading..."
        ) : (
          <div className="container">
            {!trips.length && "No archived trips!"}
            {trips.map(trip => (
              <TripCard key={trip.id} trip={trip} archived={true} />
            ))}
          </div>
        )}
      </s.TripCardStyles>
    )
  }
}

const mapStateToProps = state => ({
  trips: getTripsArray(state),
  loading: state.trips.loading
})

const mapDispatchToProps = { getArchivedTrips }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivedTrips)
