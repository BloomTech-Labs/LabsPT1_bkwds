import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import axios from "axios"
import { toast } from "react-toastify"

import Modal from "../../Modals/Modal"
import { openModal, closeModal } from "../../../redux/actions/modal"
import {
  editTrip,
  startTrip,
  addTripSafetyTimeLimit
} from "../../../redux/actions/trips"

import {
  Form,
  GhostInput,
  Button
} from "../../../styles/theme/styledComponents"

import EditIcon from "../../icons/EditSvg"
import { TripPropTypes } from "../../propTypes"
import DistanceIcon from "../../icons/DistanceSvg"
import ElevationIcon from "../../icons/ElevationSvg"
import SaveIcon from "../../icons/SaveSvg"
import AddIcon from "../../icons/AddSvg"
import * as util from "./mapUtil"
import * as s from "./components"
import { SERVER_URI } from "../../../config"
import Waypoint from "./Waypoint"
import marker from "../../icons/orange-marker.svg"
import startMarker from "../../icons/green-marker.svg"
import endMarker from "../../icons/black-marker.svg"

class TripPanel extends React.Component {
  state = {
    isEditing: false,
    saveToggle: false,
    trip: {},
    markers: [],
    elevation: null,
    tripDistance: null,
    disableSafety: false,
    hours: ""
  }

  componentDidMount() {
    this.setState({ trip: this.props.trip })
    this.props.closeModal()
    setTimeout(() => {
      this.renderWaypoints()
    }, 500)
  }

  //Use Andrews Elevation Implementation
  componentDidUpdate(_, prevState) {
    if (prevState.markers !== this.state.markers) {
      // this.getPathElevation()
      this.getPathDistance()
    }
  }

  addWaypoint = () => {
    const index = this.state.markers.length
    const marker = new window.google.maps.Marker({
      position: window.map.getCenter(),
      map: window.map,
      draggable: true,
      title: (index + 1).toString(),
      label: (index + 1).toString(),
      index: index
    })
    marker.addListener("dragend", ev => {
      const waypoints = this.state.trip.waypoints.map((item, i) => {
        if (index === i)
          return { ...item, lat: ev.latLng.lat(), lon: ev.latLng.lng() }
        else return item
      })
      this.setState({ trip: { ...this.state.trip, waypoints } })
      this.getPathDistance()
    })
    const waypoint = {
      name: `Checkpoint ${index}`,
      tripId: this.props.trip.id,
      order: index + 1,
      lat: marker.getPosition().lat(),
      lon: marker.getPosition().lng(),
      start: new Date(),
      end: new Date()
    }
    const waypoints = this.state.trip.waypoints.concat(waypoint)
    const markers = this.state.markers.concat(marker)
    this.setState({ markers, trip: { ...this.state.trip, waypoints } })
  }

  renderWaypoints = () => {
    const { maps } = window.google
    const { waypoints } = this.state.trip
    const markers = []
    const baseIcon = {
      anchor: new maps.Point(15, 30),
      scaledSize: new maps.Size(30, 30),
      labelOrigin: new maps.Point(15, 13)
    }
    const icons = {
      start: {
        url: startMarker,
        ...baseIcon
      },
      end: {
        url: endMarker,
        ...baseIcon
      },
      marker: {
        url: marker,
        ...baseIcon
      }
    }

    waypoints.forEach((waypoint, i) => {
      const position = {
        lat: waypoint.lat,
        lng: waypoint.lon
      }
      const icon =
        i === 0
          ? icons.start
          : i === waypoints.length - 1
          ? icons.end
          : icons.marker
      const label = {
        text: `${waypoint.order}`,
        color: "white",
        fontFamily: "Wals",
        fontWeight: "bold"
      }
      const marker = new maps.Marker({
        icon,
        position,
        map: window.map,
        title: waypoint.name,
        label
      })
      marker.setMap(window.map)
      marker.addListener("dragend", ({ latLng }) => {
        const updatedWaypoints = waypoints.map((item, index) =>
          index === i ? { ...item, lat: latLng.lat(), lon: latLng.lng() } : item
        )
        this.setState({
          trip: { ...this.state.trip, waypoints: updatedWaypoints }
        })
        this.getPathDistance()
      })
      markers.push(marker)
    })

    this.setState({ markers })
  }

  handleEditToggle = () => {
    this.setState({ isEditing: true, saveToggle: true }, () => {
      this.toggleDraggable()
    })
  }

  handleTitle = e => {
    this.setState({ trip: { ...this.state.trip, name: e.target.value } })
  }

  handleDelete = i => {
    const temp = this.state.trip.waypoints.filter((_, index) => {
      return i !== index
    })

    const reOrder = this.updateOrder(temp)

    this.deleteMapMarkers(i)
    if (this.state.trip.waypoints[i].id !== undefined) {
      axios
        .delete(`${SERVER_URI}/waypoints/${this.state.trip.waypoints[i].id}`)
        .then(() => {
          toast("Waypoint Deleted")
        })
    }
    this.setState({ trip: { ...this.state.trip, waypoints: reOrder } })
  }

  updateOrder = waypoints => {
    return waypoints.map((item, i) => {
      return { ...item, order: i }
    })
  }

  toggleDraggable = () => {
    this.state.markers.forEach(marker => {
      marker.setDraggable(this.state.isEditing)
    })
  }

  handleEdit = (e, i) => {
    const mapped = this.state.trip.waypoints.map((item, index) => {
      if (index === i) {
        return { ...item, name: e.target.value }
      }
      return item
    })
    this.setState({ trip: { ...this.state.trip, waypoints: mapped } })
  }

  deleteMapMarkers = i => {
    this.state.markers.forEach((item, index) => {
      if (i === index && item) {
        item.setMap(null)
      }
    })
    const updatedMarkers = this.state.markers.filter((_, index) => i !== index)
    updatedMarkers.forEach((item, index) => item.setLabel(`${index + 1}`))

    this.setState({ markers: updatedMarkers })
  }

  handleSave = () => {
    this.setState({ saveToggle: false, isEditing: false }, () => {
      this.toggleDraggable()
      this.props.editTrip(this.state.trip)
    })
  }

  getPathDistance = () => {
    if (this.state.markers.length > 1) {
      let latlngs = this.state.markers.map(marker => ({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
      }))
      util.calcTotalDistance(latlngs).then(res => {
        this.setState({ tripDistance: res.toFixed(2) })
      })
    }
  }

  handleHoursInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  startingTrip = trip => e => {
    e.preventDefault()
    if (this.state.disableSafety) {
      this.props.closeModal()
      this.props.startTrip(trip.trip)
    }

    if (this.validateSafetyModalInput()) {
      const { hours } = this.state
      this.props.addTripSafetyTimeLimit(hours)
      this.props.startTrip(trip.trip)
    }
  }

  validateSafetyModalInput = () => {
    let { hours } = this.state
    hours = Number(hours)

    if (isNaN(hours)) {
      toast("Please enter a number")
      this.setState({ hours: "" })
      return false
    }
    this.setState({ hours })
    return true
  }

  render() {
    const {
      elevation,
      isEditing,
      saveToggle,
      trip,
      tripDistance,
      waypoints
    } = this.state
    return (
      <s.Panel>
        <s.PanelHeader>
          <s.TripTitleInput
            type="text"
            edit={isEditing}
            value={trip.name || ""}
            onChange={this.handleTitle}
            disabled={isEditing === false}
          />
          {!saveToggle ? (
            <s.EditButton onClick={() => this.handleEditToggle()}>
              <EditIcon width="20px" height="20px" />
            </s.EditButton>
          ) : (
            <s.SaveButton onClick={() => this.handleSave()}>
              <SaveIcon width="20px" height="20px" />
            </s.SaveButton>
          )}
        </s.PanelHeader>
        <s.PanelSubheader>
          <s.TripDetail>
            <DistanceIcon width="25px" height="25px" />
            {tripDistance}m
          </s.TripDetail>
          <s.TripDetail>
            <ElevationIcon width="25px" height="25px" />
            {elevation}m
          </s.TripDetail>
        </s.PanelSubheader>
        <s.WaypointsHeader>
          <h4>Waypoints</h4>
          <s.AddButton
            disabled={isEditing === false}
            edit={isEditing}
            onClick={() => this.addWaypoint()}
          >
            <AddIcon height="18px" width="18px" />
          </s.AddButton>
        </s.WaypointsHeader>
        <s.WaypointList>
          {waypoints &&
            waypoints.map(({ name }, i) => (
              <Waypoint
                key={name}
                i={i}
                name={name}
                isEditing={isEditing}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
              />
            ))}
        </s.WaypointList>
        {/* <s.StartButton onClick={() => this.props.startTrip(trip)}> */}
        <s.StartButton onClick={this.props.openModal}>Start Trip</s.StartButton>
        <Modal isOpen={this.props.modalIsOpen}>
          {() => (
            <div className="startTrip-flow">
              <div className="flow-header">
                <h4>Activate Safety Feature</h4>
                <div>
                  Your emergency contact will receive a SMS alert containing
                  your last known location
                </div>
                <br />
                <div>
                  The alert will not be sent if you mark your trip as completed
                  by the specified time limit
                </div>
              </div>
              <Form onSubmit={this.startingTrip({ trip })}>
                <label>Time Limit</label>
                <GhostInput
                  placeholder="How many hours should we wait?"
                  value={this.state.hours}
                  name="hours"
                  onChange={this.handleHoursInput}
                />
                <div className="dual-buttons">
                  <Button className="btn-primary">Activate</Button>
                  <Button
                    className="btn-secondary"
                    onClick={() => this.setState({ disableSafety: true })}
                  >
                    No Thanks
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Modal>
      </s.Panel>
    )
  }
}

const mapStateToProps = state => ({
  trip: state.trips.activeTrip,
  modalIsOpen: state.modal.isOpen
})

const mapDispatchToProps = {
  editTrip,
  startTrip,
  openModal,
  closeModal,
  addTripSafetyTimeLimit
}

TripPanel.propTypes = {
  editTrip: PropTypes.func.isRequired,
  startTrip: PropTypes.func.isRequired,
  trip: TripPropTypes,
  modalIsOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  addTripSafetyTimeLimit: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPanel)
