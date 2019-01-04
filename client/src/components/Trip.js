import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import * as s from "../styles/Trip.styles"
import { deleteTrip, toggleArchive } from "../redux/actions/trips"

import { CardButton } from "../styles/theme/styledComponents"

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
              <div className="card-image">
                <img
                  src="https://staticmapmaker.com/img/google.png"
                  alt="Google Map of Albany, NY"
                />
              </div>

              <div className="card-content">
                <Link to={"/app/trip/get/" + trip.id}>View Trip</Link>
                <div>Start: {trip.start}</div>
                <div>End: {trip.end}</div>
                <CardButton>HO</CardButton>
                <CardButton onClick={this.handleDelete(trip.id)}>
                  {" "}
                  >{" "}
                </CardButton>
                <CardButton onClick={this.toggleArchive(trip.id, !archived)}>
                  {" "}
                  >{" "}
                </CardButton>
                {archived ? "UNARCHIVE" : "ARCHIVE"}
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
