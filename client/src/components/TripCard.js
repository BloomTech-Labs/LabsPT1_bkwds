import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import * as s from "../styles/Trip.styles"
import { deleteTrip, toggleArchive } from "../redux/actions/trips"

class TripCard extends Component {
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
                <Link to={"/app/trip/" + trip.id}>View Trip</Link>
                <div>Name: {trip.name}</div>
                <div>Start: {trip.start}</div>
                <div>End: {trip.end}</div>
                <div>Archived: {trip.isArchived.toString()}</div>
                {/* handleEdit here*/}
                <button onClick={this.handleDelete(trip.id)}>Edit</button>
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
)(TripCard)
