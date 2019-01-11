import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { deleteTrip, toggleArchive } from "../redux/actions/trips"

import { deleteTrip, toggleArchive, editTrip } from "../redux/actions/trips"
import { getSingleTrip } from "../redux/actions/trips"

import { CardButton, Button } from "../styles/theme/styledComponents"
class Trip extends Component {
  handleDelete = tripId => e => {
    e.preventDefault()
    this.props.deleteTrip(tripId)
  }
  handleedit = tripId => e => {
    e.preventDefault()
    this.props.editTrip(tripId)
  }
  toggleArchive = (tripId, archiveTrip) => () => {
    this.props.toggleArchive(tripId, archiveTrip)
  }

  render() {
    const { trip } = this.props
    return (
      <div>
        {!trip.id && "Loading trip"}
        {trip.id && (
          <>
            <div className="card">
              <div className="card-image">
                <img
                  src="https://staticmapmaker.com/img/google.png"
                  alt="Google Map of Albany, NY"
                />
              </div>
              <div className="card-content">
                <Link to={"/app/trip/get/" + trip.id}>View Trip</Link>
                <div>Name: {trip.name}</div>
                <div>UserID: {trip.userId}</div>
                <div>Start: {trip.start}</div>
                <div>End: {trip.end}</div>
                <Button btn-light onClick={this.toggleArchive(trip.id)}>
                  Archive
                </Button>
                <Button btn-light onClick={this.handleEdit(trip.id)}>
                  Edit
                </Button>
                <Button btn-light onClick={this.handleDelete(trip.id)}>
                  Delete
                </Button>
                {/* {archived ? "UNARCHIVE" : "ARCHIVE"} */}
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
  getSingleTrip,
  editTrip
}

export default connect(
  null,
  mapDispatchToProps
)(Trip)
