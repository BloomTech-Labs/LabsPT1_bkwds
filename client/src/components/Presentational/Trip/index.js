import React from "react"

const Trip = props => {
  return (
    <>
      <div>ID: {props.trip._id}</div>
      <div>Name: {props.trip.name}</div>
      <div>UserID: {props.trip.userId}</div>
      <div>Start: {props.trip.start}</div>
      <div>End: {props.trip.end}</div>
      <div>Updated at: {props.trip.updatedAt}</div>
      <br />
    </>
  )
}

export default Trip
