import React from "react"
import { Link } from "react-router-dom"
import * as s from "../styles/AddTripButton.styles"

const AddTripButton = ({ text }) => (
  <s.AddTripButtonStyles>
    <div className="add-trip-card-wrapper">
      <div className="add-trip-card-container">
        <Link className="add-trip-card-link" to="/app/trip/create">
          <h2>{text}</h2>
          <span>＋</span>
        </Link>
      </div>
    </div>
  </s.AddTripButtonStyles>
)

export default AddTripButton
