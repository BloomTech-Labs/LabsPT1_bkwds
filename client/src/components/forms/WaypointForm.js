import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { Button, Form, Input } from "../../styles/theme/styledComponents"
import { saveWaypoint } from "../../redux/actions/trips"

const defaultState = {
  waypoint: {
    name: "",
    arrivalDate: "",
    arrivalTime: "",
    lat: "",
    lon: ""
  }
}

class WaypointForm extends Component {
  state = { ...defaultState }

  handleChange = key => e => {
    this.setState({
      waypoint: { ...this.state.waypoint, [key]: e.target.value }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { waypoint } = this.state
    this.props.saveWaypoint({ ...waypoint })
    this.setState({ ...defaultState })
  }

  handlePinDrop = e => {
    e.preventDefault()
    alert("Drop pin on the map!")
  }

  render() {
    return (
      <div className="waypoint-form">
        <div>Start</div>
        <Button>+ Add</Button>
        <Button>- Remove</Button>
        <Form>
          <div className="waypoint-form-field">
            <Input
              type="text"
              placeholder="Waypoint Name"
              onChange={this.handleChange("name")}
            />
          </div>
          <div className="waypoint-form-field">
            Arrival:
            <Input type="date" onChange={this.handleChange("arrivalDate")} />
          </div>
          <div className="waypoint-form-field">
            Time:
            <Input type="time" onChange={this.handleChange("arrivalTime")} />
          </div>
          <Button onClick={this.handlePinDrop}>Drop Pin</Button>
          <Button onClick={this.handleSubmit}>Save Waypoint</Button>
        </Form>
      </div>
    )
  }
}

WaypointForm.propTypes = {
  saveWaypoint: PropTypes.func.isRequired
}

const mapDispatchToProps = { saveWaypoint }

export default connect(
  null,
  mapDispatchToProps
)(WaypointForm)
