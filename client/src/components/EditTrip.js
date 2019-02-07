import React from "react"

import * as s from "../styles/NewTrip.styles"
import NewTripForm from "./forms/NewTripForm"

const EditTrip = () => {
  return (
    <s.NewTripStyles>
      <div className="create-trip">
        <h3>Edit trip</h3>
        <div className="new-trip-form-wrapper">{<NewTripForm />}</div>
        <div className="new-trip-map">
          <img src="/images/map_placeholder.gif" alt="trash" />
        </div>
      </div>
    </s.NewTripStyles>
  )
}

export default EditTrip
