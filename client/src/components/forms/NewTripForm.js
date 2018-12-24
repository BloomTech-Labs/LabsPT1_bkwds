import React from "react"
import { Field, reduxForm } from "redux-form"

// import { Button, Form, Input } from "../../theme/styledComponents"

let NewTripForm = ({ handleSubmit }) => {
  return (
    <div className="new-trip-form">
      <form onSubmit={handleSubmit}>
        <div className="trip-name new-trip-form-field">
          <Field
            name="name"
            placeholder="Trip Name"
            type="text"
            // component={Input}
            component="input"
          />
        </div>
        <div className="trip-start new-trip-form-field">
          Start:
          <Field name="start" type="date" component="input" />
        </div>
        <div className="trip-end new-trip-form-field">
          End:
          <Field name="end" type="date" component="input" />
        </div>
        <div>
          DELETE
          <Field
            name="lat"
            placeholder="Latitude"
            type="text"
            component="input"
          />
          <Field
            name="lon"
            placeholder="Longitude"
            type="text"
            component="input"
          />
        </div>
        <button type="submit">Save Trip</button>
      </form>
    </div>
  )
}

NewTripForm = reduxForm({
  form: "newTrip"
})(NewTripForm)

export default NewTripForm
