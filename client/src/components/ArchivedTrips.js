import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import TripCard from "./TripCard"
import { getArchivedTrips } from "../redux/actions/trips"
import { getTripsArray } from "../utils/selectors"

class ArchivedTrips extends Component {
  componentDidMount() {
    this.props.getArchivedTrips()
  }

  render() {
    const { trips } = this.props
    return (
      <div>
        {!trips.length && "No archived trips!"}
        {trips.map(trip => (
          <TripCard key={trip.id} trip={trip} archived={true} />
        ))}
      </div>
    )
  }
}

ArchivedTrips.propTypes = {
  getArchivedTrips: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  trips: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = state => ({
  trips: getTripsArray(state)
})

const mapDispatchToProps = { getArchivedTrips }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivedTrips)
