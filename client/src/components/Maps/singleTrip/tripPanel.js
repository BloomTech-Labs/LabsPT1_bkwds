import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import axios from "axios"
import { toast } from "react-toastify"
import moment from "moment"

import "react-accessible-accordion/dist/fancy-example.css"
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion"

import Modal from "../../Modals/Modal"
import { openModal, closeModal } from "../../../redux/actions/modal"
import {
  editTrip,
  startTrip,
  addTripSafetyTimeLimit
} from "../../../redux/actions/trips"
import ElevationChart from "../../ElevationChart"
import AddButton from "../../icons/AddButton"
import ChevronIcon from "../../icons/ChevronSvg"

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
import MobileMapPanel from "../../MobileMapPanel"
import marker from "../../icons/orange-marker.svg"
import startMarker from "../../icons/green-marker.svg"
import endMarker from "../../icons/black-marker.svg"
import { numOfSamples, metersToFeet, metersToMiles } from "../../ElevationChart"
import TripPictures from "../../TripPictures"

class TripPanel extends React.Component {
  state = {
    disableSafety: false,
    velocity: 1.4,
    distances: [],
    elevations: [],
    hours: "",
    isEditing: false,
    markers: [],
    saveToggle: false,
    panelHidden: false,
    trip: {},
    tripDistance: null,
    tripPicturesToggled: false,
    waypointsMenuToggled: false,
    graphMenuToggled: false,
    tripPics: null,
    timeGaps: []
  }

  componentDidMount() {
    this.setState({ trip: this.props.trip })
    this.props.closeModal()
    setTimeout(() => {
      this.renderWaypoints()
      this.props.drawPolyline(this.state.markers)
    }, 500)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.markers !== this.state.markers) {
      this.getPathDistance()
      this.getElevationsAlongPath()
    }
  }

  getElevationsAlongPath = () => {
    const { velocity } = this.state
    if (this.state.markers.length > 1) {
      const elevator = new window.google.maps.ElevationService()
      let latLngs = this.state.markers.map(marker => ({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
      }))

      const { distances, timeGaps } = latLngs.reduce(
        (acc, curr, i, arr) => {
          if (i === arr.length - 1) return acc
          const distances = acc.distances.concat(
            util.calcDistance(
              curr.lat,
              curr.lng,
              arr[i + 1].lat,
              arr[i + 1].lng
            )
          )
          const timeGaps = acc.timeGaps.concat(
            util.calcTimeGap(distances[i], velocity).toFixed(1)
          )
          return { distances, timeGaps }
        },
        { distances: [], timeGaps: [] }
      )

      elevator.getElevationAlongPath(
        {
          path: latLngs,
          samples: numOfSamples
        },
        results => {
          this.setState({
            timeGaps,
            distances,
            elevations: results.map(result => result)
          })
        }
      )
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
      this.getElevationsAlongPath()
    })
    const waypoint = {
      name: `Checkpoint ${index + 1}`,
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
      // marker.setMap(window.map)
      marker.addListener("dragend", ev => {
        console.log("dragend Called on marker", i)
        const updatedWaypoints = waypoints.map((item, index) =>
          index === i
            ? { ...item, lat: ev.latLng.lat(), lon: ev.latLng.lng() }
            : item
        )
        this.setState({
          trip: { ...this.state.trip, waypoints: updatedWaypoints }
        })
        this.getPathDistance()
        this.getElevationsAlongPath()
      })
      markers.push(marker)
    })
    this.setState({ markers })
  }

  handleEditToggle = () => {
    this.setState({ isEditing: true, saveToggle: true }, () => {
      this.toggleDraggable()
      window.polyline.setMap(null)
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

  togglePanel = () => {
    this.setState({ panelHidden: !this.state.panelHidden })
  }

  handleEdit = (e, i) => {
    console.log(i)
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
      this.props.drawPolyline(this.state.markers)
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

  startingTrip = trip => async e => {
    e.preventDefault()
    if (this.state.disableSafety) {
      await this.props.closeModal()
      await this.props.startTrip(trip.trip)
    }

    if (this.validateSafetyModalInput()) {
      const { hours } = this.state
      await this.props.addTripSafetyTimeLimit(trip.trip, hours)
      await this.props.startTrip(trip.trip)
    }
  }

  validateSafetyModalInput = () => {
    let { hours } = this.state

    if (hours === "") {
      toast("Please enter a number")
      return false
    } else {
      hours = Number(hours)
    }

    if (isNaN(hours)) {
      toast("Please enter a number")
      this.setState({ hours: "" })
      return false
    }
    this.setState({ hours })
    return true
  }

  toggleWaypointsMenu = () => {
    if (!this.state.waypointsMenuToggled) {
      this.setState({
        waypointsMenuToggled: true,
        graphMenuToggled: false,
        tripPicturesToggled: false
      })
    } else {
      this.setState({
        waypointsMenuToggled: false
      })
    }
  }

  toggleGraphMenu = () => {
    if (!this.state.graphMenuToggled) {
      this.setState({
        graphMenuToggled: true,
        tripPicturesToggled: false,
        waypointsMenuToggled: false
      })
    } else {
      this.setState({
        graphMenuToggled: false
      })
    }
  }

  togglePicturesMenu = () => {
    if (!this.state.tripPicturesToggled) {
      this.setState({
        tripPicturesToggled: true,
        graphMenuToggled: false,
        waypointsMenuToggled: false
      })
    } else {
      this.setState({
        tripPicturesToggled: false
      })
    }
  }

  closeAllToggles = () => {
    this.setState({
      graphMenuToggled: false,
      tripPicturesToggled: false,
      waypointsMenuToggled: false
    })
  }

  render() {
    const {
      elevations,
      isEditing,
      saveToggle,
      trip,
      tripDistance,
      waypointsMenuToggled,
      graphMenuToggled,
      tripPicturesToggled,
      panelHidden,
      timeGaps
    } = this.state
    return (
      <s.TripPanelStyles>
        <MobileMapPanel>
          <div className="mobile-panel">
            {isEditing ? (
              <Button
                onClick={this.handleSave}
                className={`btn-neutral ${isEditing ? "active-button" : ""}`}
              >
                <i className="fa fa-floppy-o" />
              </Button>
            ) : (
              <Button
                onClick={this.handleEditToggle}
                className={`btn-neutral ${isEditing ? "active-button" : ""}`}
              >
                <EditIcon width="20px" height="20px" />
              </Button>
            )}

            <Button
              onClick={this.closeAllToggles}
              className={`btn-neutral ${
                !waypointsMenuToggled &&
                !graphMenuToggled &&
                !tripPicturesToggled
                  ? "active-button"
                  : ""
              }`}
            >
              <i className="fa fa-map" />
            </Button>

            <Button
              onClick={this.toggleWaypointsMenu}
              className={`btn-neutral ${
                waypointsMenuToggled ? "active-button" : ""
              }`}
            >
              <i className="fa fa-map-marker" />
            </Button>

            <Button
              onClick={this.toggleGraphMenu}
              className={`btn-neutral ${
                graphMenuToggled ? "active-button" : ""
              }`}
            >
              <i className="fa fa-area-chart" />
            </Button>

            <Button onClick={this.props.openModal} className={`btn-neutral`}>
              <i className="fa fa-play" />
            </Button>
          </div>

          <AddButton addWaypoint={this.addWaypoint} />
          <div className="mobile-toggles">
            <div className="mobile-trip-header">
              <s.PanelHeader>
                <s.TripTitleInput
                  type="text"
                  edit={isEditing}
                  value={trip.name || ""}
                  onChange={this.handleTitle}
                  disabled={isEditing === false}
                />
                <div className="trip-detail-wrapper">
                  <s.TripDetail>
                    <DistanceIcon width="25px" height="25px" />
                    {metersToMiles(tripDistance).toFixed(2)}mi
                  </s.TripDetail>
                  <s.TripDetail>
                    <ElevationIcon width="25px" height="25px" />
                    {elevations.length &&
                      metersToFeet(
                        elevations[elevations.length - 1].elevation -
                          elevations[0].elevation
                      ).toFixed(2)}
                    ft
                  </s.TripDetail>
                </div>
              </s.PanelHeader>
            </div>

            <div className="mobile-edit-trip">
              {waypointsMenuToggled && (
                <div className="mobile-edit-waypoints">
                  <s.WaypointsHeader>
                    <h4>Waypoints</h4>
                  </s.WaypointsHeader>
                  <s.WaypointList>
                    {trip.waypoints !== undefined &&
                      trip.waypoints.map(({ name }, i) => (
                        <div key={name} className="waypoint-wrapper">
                          <Waypoint
                            key={name}
                            i={i}
                            name={name}
                            isEditing={isEditing}
                            handleDelete={this.handleDelete}
                            handleEdit={this.handleEdit}
                          />

                          {timeGaps.length > 0
                            ? i === 0
                              ? "0min"
                              : `${timeGaps[i - 1]}min`
                            : null}
                        </div>
                      ))}
                  </s.WaypointList>
                </div>
              )}
            </div>
          </div>
        </MobileMapPanel>

        <s.Panel isHidden={panelHidden} className="hide-mobile">
          {panelHidden && (
            <div className="marker-icon-wrapper">
              <i className="fa fa-map-marker" />
            </div>
          )}
          <div className="chevron-icon-wrapper" onClick={this.togglePanel}>
            <ChevronIcon
              transform={panelHidden ? "rotate(90deg)" : "rotate(270deg)"}
            />
          </div>
          <div className="panel-wrapper">
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
                {metersToMiles(tripDistance).toFixed(2)}mi
              </s.TripDetail>
              <s.TripDetail>
                <ElevationIcon width="25px" height="25px" />
                {elevations.length &&
                  metersToFeet(
                    elevations[elevations.length - 1].elevation -
                      elevations[0].elevation
                  ).toFixed(2)}
                ft
              </s.TripDetail>
            </s.PanelSubheader>

            <div className="trip-actions-wrapper">
              <s.TripButton
                onClick={this.props.openModal}
                style={{ height: "38px" }}
              >
                Start Trip
              </s.TripButton>

              <s.AddButton
                disabled={isEditing === false}
                edit={isEditing}
                onClick={() => this.addWaypoint()}
              >
                <AddIcon height="18px" width="18px" />
              </s.AddButton>
            </div>

            <TripPictures
              isHidden={panelHidden}
              toggle={tripPicturesToggled}
              style={{}}
            />

            {/* NEW STUFF */}
            <div>
              {trip.waypoints &&
                trip.waypoints.map((waypoint, i) => (
                  <div key={waypoint.name} className="waypoint-wrapper">
                    <Waypoint
                      key={waypoint.name}
                      i={i}
                      name={waypoint.name}
                      isEditing={isEditing}
                      handleDelete={this.handleDelete}
                      handleEdit={this.handleEdit}
                    />
                    {timeGaps.length > 0
                      ? i === 0
                        ? "0min"
                        : `${timeGaps[i - 1]}min`
                      : null}
                  </div>
                ))}
            </div>
          </div>
        </s.Panel>

        <Modal isOpen={this.props.modalIsOpen}>
          {() => (
            <div className="modal-inner startTrip-flow">
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

        <ElevationChart
          distances={this.state.distances}
          elevations={elevations}
          mapRef={this.props.mapRef}
          toggle={graphMenuToggled}
        />
      </s.TripPanelStyles>
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
  drawPolyline: PropTypes.func.isRequired,
  trip: TripPropTypes,
  mapRef: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  addTripSafetyTimeLimit: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPanel)
