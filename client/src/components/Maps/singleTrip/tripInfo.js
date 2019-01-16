import React from "react"

export const TripInfo = props => {
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
      <h1>{props.trip.name}</h1>
    </div>
  )
}
