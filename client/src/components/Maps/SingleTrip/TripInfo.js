import React from "react"
import PropTypes from "prop-types"

export const TripInfo = props => {
  const trip = { props }
  const style = {
    padding: ".5rem",
    width: "30%",
    height: "35%",
    background: "white",
    position: "absolute",
    zIndex: 10,
    top: "1rem",
    right: "1rem"
  }
  return (
    <div style={style}>
      <h1>{trip.name}</h1>
    </div>
  )
}

TripInfo.propTypes = {
  trip: PropTypes.object
}
