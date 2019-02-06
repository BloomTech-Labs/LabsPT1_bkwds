import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import PublicTripCard from "./PublicTripCard"
import * as s from "../styles/TripCard.styles"
import { getPublicTrips } from "../redux/actions/trips"
import { getTripsArray } from "../utils/selectors"
import { TripPropTypes } from "./propTypes"

class PublicTrips extends Component {
  static propTypes = {
    getPublicTrips: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    trips: PropTypes.arrayOf(TripPropTypes),
    userId: PropTypes.string.isRequired
  }

  state = {
    publicExists: false
  }

  componentDidMount() {
    const { getPublicTrips } = this.props
    getPublicTrips()
  }

  componentDidUpdate(prevProps, prevState) {
    const publicExists = this.props.trips.some(trip => trip.isPublic)
    if (!prevState.publicExists && publicExists) {
      this.setState({ publicExists })
    }
  }

  renderPlaceholders = () =>
    this.props.trips
      .filter(trip => trip.isPublic)
      .map((_, i) => <PublicTripCard key={i} loading />)

  renderPublicTrips = () => {
    const { loading, trips } = this.props

    return trips.map(trip =>
      trip.isPublic ? (
        <PublicTripCard key={trip.id} loading={loading} trip={trip} />
      ) : null
    )
  }

  render() {
    const { loading } = this.props
    const { publicExists } = this.state
    const title = {
      paddingLeft: "20px"
    }
    return (
      <div>
        <h1 style={title}>Explore</h1>

        <s.TripCardStyles>
          <div className="container">
            {loading
              ? this.renderPlaceholders()
              : publicExists
              ? this.renderPublicTrips()
              : "No Public Trips"}
          </div>
        </s.TripCardStyles>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.trips.pending,
  trips: getTripsArray(state),
  userId: state.auth.user.id
})

export default connect(
  mapStateToProps,
  { getPublicTrips }
)(PublicTrips)
