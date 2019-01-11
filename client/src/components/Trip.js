import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import * as s from "../styles/Trip.styles"
import { deleteTrip, toggleArchive } from "../redux/actions/trips"

class Trip extends Component {
  handleDelete = tripId => e => {
    e.preventDefault()
    this.props.deleteTrip(tripId)
  }

  toggleArchive = (tripId, archiveTrip) => () => {
    this.props.toggleArchive(tripId, archiveTrip)
  }

  render() {
    const { trip, archived } = this.props
    return (
      <s.TripStyles>
        {!trip.id && "Loading trip"}
        {trip.id && (
          <>
            <div className="card">
              <img
                src="https://staticmapmaker.com/img/google.png"
                alt="Google Map of Albany, NY"
              />
              <div className="card-container">
                <Link to={"/app/trip/get/" + trip.id}>View Trip</Link>
                <div>Name: {trip.name}</div>
                <div>ID: {trip.id}</div>
                <div>UserID: {trip.userId}</div>
                <div>Start: {trip.start}</div>
                <div>End: {trip.end}</div>
                <div>Created at: {trip.createdAt}</div>
                <div>Updated at: {trip.updatedAt}</div>
                <div>Archived: {trip.isArchived.toString()}</div>
                <div>
                  Waypoints:{" "}
                  {trip.waypoints.map((w, i) => (
                    <div key={i}>{w.toString()}</div>
                  ))}
                </div>
                <button onClick={this.handleDelete(trip.id)}>DELETE</button>
                <button onClick={this.toggleArchive(trip.id, !archived)}>
                  {archived ? "UNARCHIVE" : "ARCHIVE"}
                </button>
              </div>
            </div>
            <br />
          </>
        )}
      </s.TripStyles>
    )
  }
}

const mapDispatchToProps = { deleteTrip, toggleArchive }

export default connect(
  null,
  mapDispatchToProps
)(Trip)
