import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import * as s from "../styles/TripCard.styles"
import { deleteTrip, toggleArchive } from "../redux/actions/trips"
import { Button } from "../styles/theme/styledComponents"

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
      <div>
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
                <div>{trip.name}</div>
                <div>Start: {trip.start}</div>
                <div>End: {trip.end}</div>
                <div>Created at: {trip.createdAt}</div>
                <div>Updated at: {trip.updatedAt}</div>
                <div>Archived: {trip.isArchived.toString()}</div>
                {/* handleEdit here*/}
                <CardButton onClick={this.handleDelete(trip.id)}>
                  Edit
                </CardButton>
              </div>
            </div>
            <br />
          </>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = { deleteTrip, toggleArchive }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripCard)
