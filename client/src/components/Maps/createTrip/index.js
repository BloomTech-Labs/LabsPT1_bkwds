import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import { toast } from "react-toastify"

import CreateTripPanel from "./createTripPanel"
import { media } from "../../../styles/theme/mixins"
import { SERVER_URI } from "../../../config"

const MapWrapper = Styled.div`
  position:relative;
  width:100%;
  height:100%;

  #plus-icon{
    visibility: hidden;

    ${media.tablet`
      visibility: visible;
      position: absolute;
      cursor: pointer;
      right: 5%;
      bottom: 30%;
      color: rgba(242, 106, 33, .8);
    `}
  }
`

class CreateTripMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: [],
      waypoints: [],
      title: "",
      startDate: "",
      endDate: ""
    }
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
      icon: `${SERVER_URI}/images/add_marker_icon.svg`
    })

    let markers = this.state.markers
    markers.push(marker)
    this.setState({ markers })
    this.deleteListener(marker)
    // let waypoint = {
    //   userId: this.props.userId,
    //   lat: "",
    //   lon: "",
    //   tripId: "",
    //   order: index + 1,
    //   name: `Waypoint ${index + 1}`,
    //   start: new Date(),
    //   end: new Date()
    // }

    // let waypoints = this.state.waypoints
    // waypoints.push(waypoint)
    // this.setState({ waypoints })
  }

  deleteListener = marker => {
    window.google.maps.event.addListenerOnce(marker, "dblclick", () => {
      this.deleteMarker(marker)
    })
  }

  deleteMarker = marker => {
    let markers = this.state.markers
    // let index = marker.index
    marker.setMap(null)
    let filtered = markers.filter((_, i) => {
      return i !== marker.index
    })
    // console.log(filtered)
    let newMarkers = filtered.map((item, i) => {
      return {
        ...item,
        title: (i + 1).toString(),
        label: (i + 1).toString(),
        index: i + 1
      }
    })
    // console.log(newMarkers)
    this.setState({ markers: newMarkers })
  }

  getTitle = title => {
    this.setState({ title })
  }

  saveTrip = () => {
    if (this.saveValidate()) {
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
      getTitle: this.getTitle
    }
    return (
      <MapWrapper>
        <CreateTripPanel {...props} />
        <div
          id="createTripMap"
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        {/* <i
          id="plus-icon"
          className="fas fa-plus fa-3x"
          onClick={this.addWaypoint}
        /> */}
        <img id="plus-icon" src={`${SERVER_URI}/images/add_icon.svg`} />
      </MapWrapper>
    )
  }
}

const mapStateToProps = state => {
  return { userId: state.auth.user.id }
}
export default connect(mapStateToProps)(CreateTripMap)
