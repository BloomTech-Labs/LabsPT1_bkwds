import React, { Component } from "react"
import { connect } from "react-redux"

import TripCard from "./TripCard"
import { getTrips, createTrip } from "../redux/actions/trips"
import { getTripsArray } from "../utils/selectors"
import * as s from "../styles/TripCard.styles"
import AddTripButton from "./AddTripButton"
import FirstTripButton from "./FirstTripButton"

class Trips extends Component {
  componentDidMount() {
    this.props.getTrips()
  }

  handleClick = () => e => {
    e.preventDefault()
    this.props.history.push("/app/trip/create")
  }

  renderTrips() {
    // let tripsRender
    const { trips } = this.props

    if (this.props.trips.length > 0) {
      return (
        <div>
          <s.TripCardStyles>
            <div className="container">
              {!trips.length && "No unarchived trips!"}
              {trips.map(trip => (
                <TripCard key={trip.id} trip={trip} archived={false} />
              ))}
              <AddTripButton className="AddTripButton" />
            </div>
          </s.TripCardStyles>
        </div>
      )
    } else {
      let firstTripRender
      // we may need to add a firstTripCreated attribute
      // and render FirstTrip is False, Trips if True
      // if (this.props.user.firstTrip === True) {
      //   firstTripRender = (
      //     <FirstTripButton />
      //   )
      // }
      // return firstTripRender
      if (this.props.trips.length === 0) {
        firstTripRender = <FirstTripButton />
      }
      return firstTripRender
    }
  }

  render() {
    return <div className="firstTrip">{this.renderTrips()}</div>
  }
}

const mapStateToProps = state => ({
  trips: getTripsArray(state)
})

const mapDispatchToProps = { getTrips, createTrip }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips)
