import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { deleteTrip, toggleArchive } from "../redux/actions/trips"
import { CardButton } from "../styles/theme/styledComponents"
import { Button } from "../styles/theme/styledComponents"

const TripCard = ({ trip, archived, toggleArchive }) => (
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
            <div>{trip.name}</div>
            <div>Start: {trip.start}</div>
            <div>End: {trip.end}</div>
            <div>Archived: {trip.isArchived.toString()}</div>
            <Button
              className="btn"
              onClick={() => toggleArchive(trip.id, !trip.isArchived)}
            >
              {archived ? "Unarchive" : "Archive"}
            </Button>
            <CardButton>
              ><Link to={`/app/trip/${trip.id}`}>TRIP</Link>
            </CardButton>
          </div>
        </div>
        <br />
      </>
    )}
  </div>
)

const mapDispatchToProps = { deleteTrip, toggleArchive }

export default connect(
  null,
  mapDispatchToProps
)(TripCard)
