import React, { Component } from "react"
// const express = require('express')
// const Trips = require('./TripsSchema.js')
// const router = express.Router()
import { Link } from "react-router-dom"

class TripList extends Component {
  componentDidMount() {
    this.props.getExpenses()
  }

  render() {
    return (
      <div>
        <h5>Your Trips:</h5>
        {this.props.trips.map(trip => {
          return (
            <div>
              <Link
                to={`/trip/${trip.id}`}
                className="trip-card"
                key={trip.id}
                trip={trip}
              >
                <div>
                  <div>{trip.description.substring(0, 21)}</div>
                  <hr className="my-2" />
                  <div>{trip.destination}</div>
                </div>
              </Link>
            </div>
          )
        })}

        {this.props.pending ? <h1>LOADING</h1> : null}
      </div>
    )
  }
}

export default TripList
