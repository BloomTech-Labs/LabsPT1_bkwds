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
    this.props.createTrip({ ...trip, userId: this.props.userId })
    this.setState({ ...defaultState })
  }

  render() {
    const { trip } = this.state
    return (
      <div className="new-trip-form">
        <Form>
          <div className="trip-name new-trip-form-field">
            <Input
              type="text"
              placeholder="Trip Name"
              value={trip.name}
              onChange={this.handleChange("name")}
            />
          </div>
          <div className="trip-start new-trip-form-field">
            <Input
              type="date"
              value={trip.start}
              onChange={this.handleChange("start")}
            />
          </div>
          <div className="trip-end new-trip-form-field">
            <Input
              type="date"
              value={trip.end}
              onChange={this.handleChange("end")}
            />
          </div>
          <div className="trip-lat new-trip-form-field">
            <Input
              type="text"
              placeholder="Latitude"
              value={trip.lat}
              onChange={this.handleChange("lat")}
            />
          </div>
          <div className="trip-lon new-trip-form-field">
            <Input
              type="text"
              placeholder="Longitude"
              value={trip.lon}
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

const mapStateToProps = state => ({
  userId: state.auth.user.id
})

const mapDispatchToProps = { createTrip }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTripForm)
