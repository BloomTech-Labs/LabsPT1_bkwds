import React from "react"
import axios from "axios"
import { connect } from "react-redux"
import { toast } from "react-toastify"

import CreateTripPanel from "./createTripPanel"
import { MapWrapper } from "../../../styles/CreateTrip.styles"
import { SERVER_URI } from "../../../config"
import CustomMarker from "../../../assets/add_icon-min.png"
import CustomWaypoint from "../../../assets/add_marker_icon-min.png"

class CreateTripMap extends React.Component {
  state = {
    markers: [],
    waypoints: [],
    title: "",
    startDate: "",
    endDate: ""
  }

  componentDidMount() {
    window.map = new window.google.maps.Map(
      document.getElementById("createTripMap"),
      {
        center: { lat: 39.0997, lng: -94.5786 },
        zoom: 5,
        disableDefaultUI: true
      }
    )
  }

  addWaypoint = () => {
    const index = this.state.markers.length
    let marker = new window.google.maps.Marker({
      position: window.map.getCenter(),
      map: window.map,
      draggable: true,
      title: (index + 1).toString(),
      label: (index + 1).toString(),
      index: index,
      icon: CustomWaypoint
    })

    let markers = this.state.markers
    markers.push(marker)
    this.setState({ markers })
    this.deleteListener(marker)
  }

  deleteListener = marker => {
    window.google.maps.event.addListenerOnce(marker, "dblclick", () => {
      this.deleteMarker(marker)
    })
  }

  deleteMarker = marker => {
    let markers = this.state.markers
    marker.setMap(null)
    let filtered = markers.filter((_, i) => {
      return i !== marker.index
    })
    let newMarkers = filtered.map((item, i) => {
      return {
        ...item,
        title: (i + 1).toString(),
        label: (i + 1).toString(),
        index: i + 1
      }
    })
    this.setState({ markers: newMarkers })
  }

  getTitle = title => {
    this.setState({ title })
  }

  getDates = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate })
  }

  saveTrip = () => {
    const { markers } = this.state
    let config = {
      headers: { Authorization: "Bearer " + this.props.token }
    }
    if (this.saveValidate()) {
      let trip = {
        userId: this.props.userId,
        isArchived: false,
        name: this.state.title,
        start: this.state.startDate.utc().format(),
        end: this.state.endDate.utc().format(),
        lat: window.map.getCenter().lat(),
        lon: window.map.getCenter().lng()
      }
      axios
        .post(`${SERVER_URI}/trips/`, trip, config)
        .then(resp => {
          let waypoints = markers.map(marker => {
            return {
              tripId: resp.tripId,
              order: marker.index + 1,
              name: `Checkpoint ${marker.index}`,
              lat: marker.getPosition().lat(),
              lon: marker.getPosition().lng(),
              end: Date.now()
            }
            axios
              .post(`${SERVER_URI}/waypoints/batch`, waypoints, config)
              .then(waypoints => {
                console.log(waypoints)
              })
              .catch(() => {
                console.log("Error posting to waypoints")
              })
          })
        })
        .catch(() => {
          console.log("Error posting to waypoints")
        })
    }
  }

  saveValidate = () => {
    const { startDate, endDate, title } = this.state
    if (startDate === null || endDate === null) {
      toast("Date not provided")
      return false
    }
    if (title === "") {
      toast("Title not provided")
      return false
    }
    return true
  }

  render() {
    let props = {
      addWaypoint: this.addWaypoint,
      deleteListener: this.deleteListener,
      getTitle: this.getTitle,
      saveTrip: this.saveTrip,
      getDates: this.getDates
    }
    return (
      <MapWrapper>
        <CreateTripPanel {...props} />
        <div
          id="createTripMap"
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        <img
          id="plus-icon"
          src={CustomMarker}
          onClick={this.addWaypoint}
          alt="Custom Add Icon"
        />
      </MapWrapper>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return { token: state.auth.token, userId: state.auth.user.id }
}
export default connect(mapStateToProps)(CreateTripMap)
