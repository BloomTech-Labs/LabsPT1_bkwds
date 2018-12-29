import React, { Component } from "react"
import { connect } from "react-redux"

import Trip from "./Trip"
import { getArchivedTrips } from "../redux/actions/trips"

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
          <Trip key={trip.id} trip={trip} archived={true} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  trips: Object.keys(state.trips.trips).map(key => state.trips.trips[key])
})

const mapDispatchToProps = { getArchivedTrips }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivedTrips)
