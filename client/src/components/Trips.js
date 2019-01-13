import React, { Component } from "react"
import { connect } from "react-redux"

import TripCard from "./TripCard"
import { getTrips, createTrip } from "../redux/actions/trips"
import { getTripsArray } from "../utils/selectors"
import * as s from "../styles/TripCard.styles"
import { Button } from "../styles/theme/styledComponents"
import AddTripButton from "./AddTripButton"

class Trips extends Component {
  componentDidMount() {
    this.props.getTrips()
  }

  handleClick = () => e => {
    e.preventDefault()
    this.props.history.push("/app/trip/create")
  }

  //   renderTrips() {
  //     let tripsRender
  //     const { trips } = this.props

  //     if (this.props.trips.length >= 1) {
  //       return (tripsRender = (
  //         <s.TripCardStyles>
  //           <div className="container">
  //             {!trips.length && "No unarchived trips!"}
  //             {trips.map(trip => (
  //               <TripCard key={trip.id} trip={trip} archived={false} />
  //             ))}
  //             <AddTripButton />
  //           </div>
  //         </s.TripCardStyles>
  //       ))
  //     } else {
  //       let firstTripRender

  //       if (this.props.trips.length === 0) {
  //         firstTripRender = (
  //           <div className="firstTrip">
  //             <p> Add Your First Trip</p>
  //             <Button onClick={this.handleClick()}>+</Button>
  //           </div>
  //         )
  //       }

  //       return firstTripRender
  //     }
  //   }

  //   render() {
  //     return <div className="firstTrip">{this.renderTrips()}</div>
  //   }
  // }
  render() {
    const { trips } = this.props

    return (
      <s.TripCardStyles>
        <div className="container">
          {trips.length > 0 ? (
            trips.map(trip => (
              <TripCard key={trip.id} trip={trip} archived={false} />
            ))
          ) : (
            <div>No trips!</div>
          )}
        </div>
      </s.TripCardStyles>
    )
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
