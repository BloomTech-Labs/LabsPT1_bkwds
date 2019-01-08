import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import * as s from "../styles/Trip.styles"
import { deleteTrip, toggleArchive } from "../redux/actions/trips"
import { getSingleTrip } from "../redux/actions/trips"

import { CardButton, Button } from "../styles/theme/styledComponents"

class Trip extends Component {
  handleSingleTrip = tripId => e => {
    e.preventDefault()
    this.props.getSingleTrip(tripId)
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
                <CardButton onClick={this.handleSingleTrip(trip.id)}>
                  {" "}
                  >TT{" "}
                </CardButton>
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

const mapDispatchToProps = { deleteTrip, toggleArchive, getSingleTrip }

export default connect(
  null,
  mapDispatchToProps
)(Trip)
