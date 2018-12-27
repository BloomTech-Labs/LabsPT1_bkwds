import React from "react"
import "./index.css"

const TripCard = ({ trip }) => {
  console.log(trip, "TRIP")
  return (
    <div key={trip.id} trip={trip} className="card">
      <img
        src="https://staticmapmaker.com/img/google.png"
        alt="Google Map of Albany, NY"
      />
      <div className="card-container">
        <h4>
          <b>{trip.name}</b>
        </h4>
        <p>{trip.start}</p>
        <p>{trip.end}</p>
        <button>Start Trip</button>
      </div>
    </div>
  )
}

export default TripCard
