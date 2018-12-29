import React from "react"
import { Field, reduxForm } from "redux-form"

import { Button, Form, Input } from "../../styles/theme/styledComponents"

let WaypointForm = ({ handleSubmit }) => {
  return (
    <div className="waypoint-form">
      <div>Start</div>
      <Button>+ Add</Button>
      <Button>- Remove</Button>
      <Form onSubmit={handleSubmit}>
        <div className="waypoint-form-field">
          <Field
            name="waypointName"
            type="text"
            placeholder="Waypoint Name"
            component={Input}
          />
        </div>
        <div className="waypoint-form-field">
          Arrival:
          <Field name="waypointArrivalDate" type="date" component="input" />
        </div>
        <div className="waypoint-form-field">
          Time:
          <Field name="waypointArrivalTime" type="time" component="input" />
        </div>
        <Button>Drop Pin</Button>
      </Form>
    </div>
  )
}

WaypointForm = reduxForm({
  form: "waypointForm"
})(WaypointForm)

export default WaypointForm
