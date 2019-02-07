import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"
import PropTypes from "prop-types"
import { TripPropTypes } from "./propTypes"

import { STATIC_MAP_KEY } from "../config"

import TripCardLoader from "./TripCardLoader"
import { togglePublic } from "../redux/actions/trips"

const Card = ({ trip }) => (
  <>
    <Link to={`/public/${trip.id}`}>
      <div className="card-image">
        <img
          src={
            trip.image
              ? `${trip.image}${STATIC_MAP_KEY}`
              : "https://staticmapmaker.com/img/google.png"
          }
          alt="Static Map"
        />
      </div>
    </Link>
    <div className="card-content">
      <h5>{trip.name}</h5>
      <div>Start: {moment(trip.start).format("LL")}</div>
      <div>End:&nbsp;&nbsp;&nbsp;{moment(trip.end).format("LL")}</div>
      <div className="card-cta" />
    </div>
  </>
)

const PublicTripCard = props => (
  <div className="card">
    {props.loading ? <TripCardLoader /> : <Card {...props} />}
  </div>
)

PublicTripCard.propTypes = {
  loading: PropTypes.bool.isRequired,
  trip: TripPropTypes,
  userId: PropTypes.string
}

const mapStateToProps = ({ auth, router, trips }) => ({
  userId: auth.user.id,
  isPublicTripRoute: router.location.pathname === "/app/trips/explore",

  loading: trips.pending
})

export default connect(
  mapStateToProps,
  { togglePublic }
)(PublicTripCard)
