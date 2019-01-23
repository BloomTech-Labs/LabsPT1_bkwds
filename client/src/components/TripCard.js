import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { TripPropTypes } from "./propTypes"

import { toggleArchive, repeatTrip } from "../redux/actions/trips"
import { CardButton } from "../styles/theme/styledComponents"
import ChevronSvg from "./icons/ChevronSvg"
import { Button } from "../styles/theme/styledComponents"

const TripCard = ({
  trip,
  archived,
  toggleArchive,
  repeatTrip,
  user,
  isArchivedTripRoute
}) => (
  <div>
    {!trip.id && "Loading trip"}
    {trip.id && (
      <>
        <div className="card">
          <div className="card-image">
            <img
              className={archived ? "grayscale" : ""}
              src="https://staticmapmaker.com/img/google.png"
              alt="Google Map of Albany, NY"
            />
            {archived && <div className="text-overlay">ARCHIVED</div>}
          </div>
          <div className="card-content">
            <div>{trip.name}</div>
            <div>Start: {trip.start}</div>
            <div>End: {trip.end}</div>
            <div className="card-cta">
              <Button
                className={archived ? "btn-gray" : "btn"}
                onClick={() => toggleArchive(trip.id, archived, user)}
              >
                {archived ? "Unarchive" : "Archive"}
              </Button>
              {isArchivedTripRoute && (
                <Button className="btn" onClick={() => repeatTrip(trip)}>
                  Repeat
                </Button>
              )}
            </div>
            <Link to={`/app/trip/${trip.id}`}>
              <CardButton>
                <ChevronSvg
                  width="2rem"
                  height="2rem"
                  transform="rotate(-90deg)"
                />
              </CardButton>
            </Link>
          </div>
        </div>
        <br />
      </>
    )}
  </div>
)

TripCard.propTypes = {
  archived: PropTypes.bool.isRequired,
  toggleArchive: PropTypes.func.isRequired,
  trip: TripPropTypes
}

const mapDispatchToProps = { toggleArchive, repeatTrip }

const mapStateToProps = state => ({
  user: state.auth.user.id,
  isArchivedTripRoute: state.router.location.pathname === "/app/trips/archived"
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripCard)
