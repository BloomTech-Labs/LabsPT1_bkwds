import React from "react"
import { Link } from "react-router-dom"

import * as s from "../styles/Trip.styles"

const Trip = props => {
  return (
    <s.TripStyles>
      <div>
        ID: <Link to={"/app/trip/get/" + props.trip._id}>{props.trip._id}</Link>
      </div>
      <div>Name: {props.trip.name}</div>
      <div>UserID: {props.trip.userId}</div>
      <div>Start: {props.trip.start}</div>
      <div>End: {props.trip.end}</div>
      <div>Updated at: {props.trip.updatedAt}</div>
      <br />
    </s.TripStyles>
  )
}

export default Trip
