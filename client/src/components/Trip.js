import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import * as s from "../styles/Trip.styles"
import { deleteTrip, archiveTrip } from "../redux/actions/trips"

class Trip extends Component {
  handleDelete = tripId => e => {
    e.preventDefault()
    this.props.deleteTrip(tripId)
  }

  handleArchive = tripId => e => {
    // e.preventDefault()
    this.props.archiveTrip(tripId)
  }

  render() {
    const { trip } = this.props
    return (
      <s.TripStyles>
        <div>
          ID: <Link to={"/app/trip/get/" + trip.id}>{trip.id}</Link>
          <button onClick={this.handleDelete(trip.id)}>DELETE</button>
          <button onClick={this.handleArchive(trip.id)}>ARCHIVE</button>
        </div>
        <div>Name: {trip.name}</div>
        <div>UserID: {trip.userId}</div>
        <div>Start: {trip.start}</div>
        <div>End: {trip.end}</div>
        <div>Created at: {trip.createdAt}</div>
        <div>Updated at: {trip.updatedAt}</div>
        <br />
      </s.TripStyles>
    )
  }
}

const mapDispatchToProps = { deleteTrip }

export default connect(
  null,
  mapDispatchToProps
)(Trip)
