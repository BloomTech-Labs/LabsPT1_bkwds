import React from "react"
import axios from "axios"
import { connect } from "react-redux"
import { toast } from "react-toastify"

import CreateTripPanel from "./createTripPanel"
import { MapWrapper } from "../../../styles/CreateTrip.styles"
import AddButton from "../../icons/AddButton.js"
import mapMarker from "../../icons/orange-marker.svg"
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
    const userCenter = center.length ? { lat: center[0], lng: center[1] } : null

    window.map = new window.google.maps.Map(
      document.getElementById("createTripMap"),
      {
        center: userCenter ? userCenter : { lat: 39.0997, lng: -94.5786 },
        zoom: 11,
        disableDefaultUI: true
      }
    )
    axios.defaults.headers.common["Authorization"] = this.props.token
  }

  addWaypoint = () => {
    const { markers } = this.state
    const index = markers.length
    const { maps } = window.google
    const icon = {
      url: mapMarker,
      anchor: new maps.Point(15, 30),
      scaledSize: new maps.Size(30, 30),
      labelOrigin: new maps.Point(15, 13)
    }
    const label = {
      text: (index + 1).toString(),
      color: "white",
      fontFamily: "Wals",
      fontWeight: "bold"
    }
    const marker = new window.google.maps.Marker({
      position: window.map.getCenter(),
      map: window.map,
      draggable: true,
      label,
      index,
      icon
    })

    this.setState({ markers: [...markers, marker] })
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
        lon: window.map.getCenter().lng(),
        image: this.generateMapImageUrl()
      }
      this.props.createTrip(trip, markers)
    }
  }

  generateMapImageUrl = () => {
    const staticMapAPI = "https://maps.googleapis.com/maps/api/staticmap?"
    let lat = window.map
      .getCenter()
      .lat()
      .toString()
    let lon = window.map
      .getCenter()
      .lng()
      .toString()
    return `${staticMapAPI}center=${lat},${lon}&zoom=15&size=380x350&key=`
  }

  saveValidate = () => {
    const { startDate, endDate, title, markers } = this.state
    if (!startDate || !endDate) {
      toast.error("Date not provided", {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      return false
    }
    if (title === "") {
      toast.error("Title not provided", {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      return false
    }
    if (!markers.length) {
      toast.error("Set at least 1 checkpoint", {
        position: toast.POSITION.BOTTOM_RIGHT
      })
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
        <AddButton addWaypoint={this.addWaypoint} />
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
