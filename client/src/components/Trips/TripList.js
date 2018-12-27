import React, { Component } from "react"
import TripCard from "./TripCard"
import "./index.css"

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
        name: "Coachella",
        start: "here",
        end: "there"
      },
      {
        id: 3,
        name: "Burning Man",
        start: "here",
        end: "there"
      },
      {
        id: 4,
        name: "Appalachian Trail",
        start: "here",
        end: "there"
      }
    ]
  }

  render() {
    return (
      <div class="container">
        {this.state.trips.map(trip => (
          <TripCard key={trip.id} trip={trip} class="cards" />
        ))}
      </div>
    )
  }
}

export default TripList
