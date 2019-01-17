import React, { Component } from "react"
import { connect } from "react-redux"

import { deleteTrip, toggleArchive, editTrip } from "../redux/actions/trips"

import { Button } from "../styles/theme/styledComponents"

class TripDetails extends Component {
  toggleArchive = (tripId, archiveTrip) => () => {
    this.props.toggleArchive(tripId, archiveTrip)
  }

  handleEditTrip = tripId => e => {
    e.preventDefault()
    this.props.editTrip(tripId)
  }

  handleDeleteTrip = tripId => e => {
    e.preventDefault()
    this.props.deleteTrip(tripId)
  }

  render() {
    const { trip, archived } = this.props
    return (
      <div>
        {!trip.id && "Loading trip"}
        {trip.id && (
          <>
            <div key={trip.id} trip={trip} className="card">
              <div className="card-image">
                <img
                  src="https://staticmapmaker.com/img/google.png"
                  alt="Google Map of Albany, NY"
                />
              </div>
              <div className="card-content">
                <div>{trip.name}</div>
                <div>UserID: {trip.userId}</div>
                <div>Start: {trip.start}</div>
                <div>End: {trip.end}</div>
                <div> Lat: {trip.lat}</div>
                <div> Lon: {trip.lon}</div>
                <Button btn-light onClick={this.toggleArchive(trip.id)}>
                  Archive
                </Button>
                {archived ? "UNARCHIVE" : "ARCHIVE"}
                <Button btn-light onClick={this.handleEditTrip(trip.id)}>
                  Edit
                </Button>
                <Button btn-light onClick={this.handleDeleteTrip(trip.id)}>
                  Delete
                </Button>
              </div>
            </div>
            <br />
          </>
        )}
      </div>
    )
  }
}
const mapDispatchToProps = {
  deleteTrip,
  toggleArchive,
  editTrip
}

export default connect(
  null,
  mapDispatchToProps
)(TripDetails)
