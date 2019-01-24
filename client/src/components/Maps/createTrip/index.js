import React from "react"
import axios from "axios"
import { connect } from "react-redux"
import { toast } from "react-toastify"

import CreateTripPanel from "./createTripPanel"
import { MapWrapper } from "../../../styles/CreateTrip.styles"
import CustomMarker from "../../../assets/add_icon-min.png"
import CustomWaypoint from "../../../assets/add_marker_icon-min.png"
import { createTrip } from "../../../redux/actions/trips"

class CreateTripMap extends React.Component {
  state = {
    markers: [],
    title: "",
    startDate: null,
    endDate: null
  }

  componentDidMount() {
    const { center } = this.props
    const userCenter = center.length
      ? {
          lat: parseFloat(center[0].$numberDecimal),
          lng: parseFloat(center[1].$numberDecimal)
        }
      : null

    window.map = new window.google.maps.Map(
      document.getElementById("createTripMap"),
      {
        center: userCenter ? userCenter : { lat: 39.0997, lng: -94.5786 },
        zoom: 9,
        disableDefaultUI: true
      }
    )
    axios.defaults.headers.common["Authorization"] = this.props.token
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

    if (this.saveValidate()) {
      let trip = {
        userId: this.props.userId,
        name: this.state.title,
        start: this.state.startDate.utc().format(),
        end: this.state.endDate.utc().format(),
        lat: window.map.getCenter().lat(),
        lon: window.map.getCenter().lng()
      }

      this.props.createTrip(trip, markers)
    }
  }

  saveValidate = () => {
    const { startDate, endDate, title, markers } = this.state
    if (!startDate || !endDate) {
      toast("Date not provided")
      return false
    }
    if (title === "") {
      toast("Title not provided")
      return false
    }
    if (!markers.length) {
      toast("Set at least 1 checkpoint")
      return false
    }
    return true
  }

  render() {
    let props = {
      addWaypoint: this.addWaypoint,
      deleteListener: this.deleteListener,
      getDates: this.getDates,
      getTitle: this.getTitle,
      saveTrip: this.saveTrip
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

const mapStateToProps = state => ({
  token: state.auth.token,
  userId: state.auth.user.id,
  center: state.auth.user.coordinates
})

const mapDispatchToProps = { createTrip }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripMap)
