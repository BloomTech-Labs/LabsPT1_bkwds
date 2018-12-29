import React, { Component } from "react"
import { connect } from "react-redux"

import { Form, Input, Button } from "../../styles/theme/styledComponents"
import { createTrip } from "../../redux/actions/trips"

const defaultState = {
  trip: {
    name: "",
    start: "",
    end: "",
    lat: "",
    lon: ""
  }
}

class NewTripForm extends Component {
  state = { ...defaultState }

  handleChange = key => e => {
    this.setState({ trip: { ...this.state.trip, [key]: e.target.value } })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { trip } = this.state
    console.log("NEW FORM TRIP ON SUBMIT:", { ...trip })
    this.props.createTrip({ ...trip })
    this.setState({ ...defaultState })
  }

  render() {
    return (
      <div className="new-trip-form">
        <Form>
          <div className="trip-name new-trip-form-field">
            <Input
              type="text"
              placeholder="Trip Name"
              onChange={this.handleChange("name")}
            />
          </div>
          <div className="trip-start new-trip-form-field">
            <Input type="date" onChange={this.handleChange("start")} />
          </div>
          <div className="trip-end new-trip-form-field">
            <Input type="date" onChange={this.handleChange("end")} />
          </div>
          <div className="trip-lat new-trip-form-field">
            <Input
              type="text"
              placeholder="Latitude"
              onChange={this.handleChange("lat")}
            />
          </div>
          <div className="trip-lon new-trip-form-field">
            <Input
              type="text"
              placeholder="Longitude"
              onChange={this.handleChange("lon")}
            />
          </div>
          <Button type="submit" onClick={this.handleSubmit}>
            Log in
          </Button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = { createTrip }

export default connect(
  null,
  mapDispatchToProps
)(NewTripForm)
