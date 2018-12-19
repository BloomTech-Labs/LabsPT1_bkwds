import React, { Component } from "react"

import { Link } from "react-router-dom"
import TripCard from "./TripCard"

class TripList extends Component {
  state = {
    trips: [
      {
        id: 1,
        name: "dawsons creek",
        start: "here",
        end: "there"
      },
      {
        id: 2,
        name: "dawsons h",
        start: "here",
        end: "there"
      }
    ]
  }

  render() {
    return (
      <div>
        <h5>Your Trips:</h5>

        {this.state.trips.map(trip => (
          <Link to={`/trips/${trip.name}`}>
            <TripCard key={trip.id} trip={trip} />
          </Link>
        ))}
      </div>
    )
  }
}

export default TripList
