import React from "react"
import { Field, reduxForm } from "redux-form"

import { Button, Form } from "../../styles/theme/styledComponents"
import { CustomInput as Input } from "./customInputs"

let NewTripForm = ({ handleSubmit }) => {
  return (
    <div className="new-trip-form">
      <Form onSubmit={handleSubmit}>
        <div className="trip-name new-trip-form-field">
          <Field
            name="name"
            placeholder="Trip Name"
            type="text"
            component={Input}
          />
        </div>
        <div className="trip-start new-trip-form-field">
          Start:
          <Field name="start" type="date" component={Input} />
        </div>
        <div className="trip-end new-trip-form-field">
          End:
          <Field name="end" type="date" component={Input} />
        </div>
        <div className="trip-lat new-trip-form-field">
          <Field
            name="lat"
            placeholder="Latitude"
            type="text"
            component={Input}
          />
        </div>
        <div className="trip-lon new-trip-form-field">
          <Field
            name="lon"
            placeholder="Longitude"
            type="text"
            component={Input}
          />
        </div>
        <Button type="submit">Save Trip</Button>
      </Form>
    </div>
  )
}

NewTripForm = reduxForm({
  form: "newTrip"
})(NewTripForm)

export default NewTripForm
