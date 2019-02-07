import React from "react"
import { connect } from "react-redux"
import moment from "moment"
import PropTypes from "prop-types"
import { TripPropTypes } from "./propTypes"

import { STATIC_MAP_KEY } from "../config"

import TripCardLoader from "./TripCardLoader"
import { Link } from "react-router-dom"
import { toggleArchive, repeatTrip, togglePublic } from "../redux/actions/trips"
import { Button } from "../styles/theme/styledComponents"

const Card = ({
  archived,
  isArchivedTripRoute,
  togglePublic,
  repeatTrip,
  toggleArchive,
  trip,
  userId
}) => (
  <>
    <Link to={`/app/trip/${trip.id}`}>
      <div className="card-image">
        <img
          className={archived ? "grayscale" : ""}
          src={
            trip.image
              ? `${trip.image}${STATIC_MAP_KEY}`
              : "https://staticmapmaker.com/img/google.png"
          }
          alt="Static Map"
        />
        {archived && <div className="text-overlay">ARCHIVED</div>}
      </div>
    </Link>
    <div className="card-content">
      <h5>{trip.name}</h5>
      <div>Start: {moment(trip.start).format("LL")}</div>
      <div>End:&nbsp;&nbsp;&nbsp;{moment(trip.end).format("LL")}</div>
      <div className="card-cta">
        <Button
          className={archived ? "btn-gray" : "btn-tertiary"}
          onClick={() => toggleArchive(trip.id, archived, userId)}
        >
          {archived ? "Unarchive" : "Archive"}
        </Button>
        {!isArchivedTripRoute && (
          <Button
            className={`btn-tertiary ${trip.isPublic ? "btn-gray" : ""}`}
            onClick={() => togglePublic(trip.id, userId)}
          >
            {trip.isPublic ? "Make Private" : "Share!"}
          </Button>
        )}
        {isArchivedTripRoute && (
          <Button className="btn-tertiary" onClick={() => repeatTrip(trip)}>
            Repeat
          </Button>
        )}
      </div>
    </div>
  </>
)

const TripCard = props => (
  <div className="card">
    {props.loading ? <TripCardLoader /> : <Card {...props} />}
  </div>
)

TripCard.propTypes = {
  archived: PropTypes.bool.isRequired,
  isArchivedTripRoute: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  repeatTrip: PropTypes.func.isRequired,
  toggleArchive: PropTypes.func.isRequired,
  trip: TripPropTypes,
  userId: PropTypes.string
}

const mapStateToProps = ({ auth, router, trips }) => ({
  userId: auth.user.id,
  isArchivedTripRoute: router.location.pathname === "/app/trips/archived",

  loading: trips.pending
})

export default connect(
  mapStateToProps,
  { toggleArchive, repeatTrip, togglePublic }
)(TripCard)
