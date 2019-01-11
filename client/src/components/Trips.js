import React, { Component } from "react"
import { connect } from "react-redux"
import { browserHistory } from "react-router"

import TripCard from "./TripCard"
import { getTrips, createTrip } from "../redux/actions/trips"
import { getTripsArray } from "../utils/selectors"
import * as s from "../styles/TripCard.styles"
import { CardButton, Button } from "../styles/theme/styledComponents"
import AddTripButton from "./AddTripButton"

class Trips extends Component {
  componentDidMount() {
    this.props.getTrips()
  }

  handleClick = () => e => {
    e.preventDefault()
    this.props.history.push("/app/trip/create")
  }

  renderTrips() {
    let tripsRender
    const { trips } = this.props

    if (this.props.trips.length >= 1) {
      return (tripsRender = (
        <s.TripCardStyles>
          <div className="container">
            {!trips.length && "No unarchived trips!"}
            {trips.map(trip => (
              <TripCard key={trip.id} trip={trip} archived={false} />
            ))}
            <AddTripButton />
          </div>
        </s.TripCardStyles>
      ))
    } else {
      let firstTripRender

      if (this.props.trips.length === 0) {
        firstTripRender = (
          <div className="firstTrip">
            <p> Add Your First Trip</p>
            <Button onClick={this.handleClick()}>+</Button>
          </div>
        )
      }

      return firstTripRender
    }
  }

  //         <div className="nav-links-wrapper">
  //   {isHomeOrAuthPath && !isLoggedIn ? (
  //     <UnauthenticatedLinks pathname={pathname} />
  //   ) : null}
  //   {isLoggedIn && <AuthenticatedLinks logout={logout} />}
  // </div>

  render() {
    return (
      <div>
        <p>Text:</p>
        {this.renderTrips()}
        {/* {this.renderAddFirstTrip()} */}
      </div>
    )
  }
  // render() {
  //   const hasTrips = this.state.trips;
  //   let greeting;

  //   if (hasTrips) {
  //     greeting = <AddFirstTrip onClick={this.handleNewTrip} />;
  //   } else {
  //     greeting = <AddNewTrip onclick={this.handleNewTrip} />
  //   }
  //   const { trips } = this.props
  //   return (
  //     //if trips is empty -> display first trip
  //     if(this.state.trips.length > 0) {
  //       return (
  //         <div>
  //           <p>Text: {this.state.text}</p>
  //           <button onClick={this.handleEdit}>
  //             Edit
  //           </button>
  //         </div>
  //       );
  //     } else {
  //     return (
  //       <div>
  //         <s.TripCardStyles>
  //           <div className="container">
  //             {!trips.length && "No unarchived trips!"}
  //             {trips.map(trip => (
  //               <TripCard key={trip.id} trip={trip} archived={false} />
  //             ))}
  //           </div>
  //         </s.TripCardStyles>
  //         <AddTripButton/>
  //       </div>
  //     );
  //   }
  // }
}

const mapStateToProps = state => ({
  trips: getTripsArray(state)
})

const mapDispatchToProps = { getTrips, createTrip }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips)
