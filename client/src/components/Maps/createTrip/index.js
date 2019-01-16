import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"

import CreateTripPanel from "./createTripPanel"
import { media } from "../../../styles/theme/mixins"

const MapWrapper = Styled.div`
  position:relative;
  width:100%;
  height:100%;

  #plus-icon{
    visibility: hidden;

    ${media.tablet`
      visibility: visible;
      position: absolute;
      right: 5%;
      bottom: 30%;
      color: rgba(108, 122, 137, .8)
    `}
  }

`

class CreateTripMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      markers: [],
      waypoints: [],
      markerListeners: []
    }
  }
  componentDidMount() {
    var map = new window.google.maps.Map(
      document.getElementById("createTripMap"),
      {
        center: { lat: 39.0997, lng: -94.5786 },
        zoom: 5,
        disableDefaultUI: true
      }
    )
    this.setState({ map: map })
  }

  addWaypoint = () => {
    const index = this.state.markers.length
    let marker = new window.google.maps.Marker({
      position: this.state.map.getCenter(),
      map: this.state.map,
      draggable: true,
      title: (index + 1).toString(),
      label: (index + 1).toString()
    })

    let waypoint = {
      userId: this.props.userId,
      lat: "",
      lon: "",
      tripId: "",
      order: index + 1,
      name: `Waypoint ${index + 1}`,
      start: new Date(),
      end: new Date()
    }

    // this.markerListener(marker)
    let markers = this.state.markers
    markers.push(marker)
    this.setState({ markers })

    let waypoints = this.state.waypoints
    waypoints.push(waypoint)
    this.setState({ waypoints })
  }

  markerListener = marker => {
    let listener = marker.addListener("dragend", ev => {})
    // UPDATE LAT AND LON ON MARKER AND WAYPOINT EVERYTIME IT"S DRAGGED

    // const mappedWaypoints = this.state.waypoints.map((item, i) => {
    //   if (i !== index) {
    //     // window.google.maps.event.removeListener(listener)
    //     // window.google.maps.event.removeListener(markerListener)
    //     return item
    //   } else {
    //     // window.google.maps.event.removeListener(listener)
    //     // window.google.maps.event.removeListener(markerListener)
    //     return { ...item, lat: ev.latLng.lat(), lon: ev.latLng.lng() }
    //   }
    // })
    let listeners = this.state.markerListeners
    listeners.push(listener)
    this.setState({ markerListeners: listeners })
    // })
  }

  // addWaypoint = map => {
  //   if (map === null) return
  //   const index = this.state.markers.length
  //   const listener = map.addListener("click", e => {
  //     let marker = new window.google.maps.Marker({
  //       position: e.latLng,
  //       map: map,
  //       draggable: true,
  //       title: (index + 1).toString(),
  //       label: (index + 1).toString()
  //     })
  //     const markerListener = marker.addListener("dragend", ev => {
  //       const mappedWaypoints = this.state.waypoints.map((item, i) => {
  //         if (i !== index) {
  //           window.google.maps.event.removeListener(listener)
  //           window.google.maps.event.removeListener(markerListener)
  //           return item
  //         } else {
  //           window.google.maps.event.removeListener(listener)
  //           window.google.maps.event.removeListener(markerListener)
  //           return { ...item, lat: ev.latLng.lat(), lon: ev.latLng.lng() }
  //         }
  //       })
  //       this.setState({ waypoints: mappedWaypoints })
  //     })
  //     this.setState(prevState => ({
  //       waypoints: [
  //         ...prevState.waypoints,
  //         {
  //           userId: this.props.userId,
  //           lat: e.latLng.lat(),
  //           lon: e.latLng.lng(),
  //           tripId: this.props.tripId,
  //           order: index + 1,
  //           name: `Waypoint ${index + 1}`,
  //           start: new Date(),
  //           end: new Date()
  //         }
  //       ]
  //     }))
  //     let markers = this.state.markers
  //     markers.push(marker)
  //     this.setState({ markers })
  // this.setState(prevState => ({
  //   markers: [...prevState.markers, marker]
  // }))

  // window.google.maps.event.removeListener(listener)
  // window.google.maps.event.removeListener(markerListener)
  // })
  // }

  //filter waypoint and markers for i, then Re-Apply markers to maps
  updateOrder = waypoints => {
    return waypoints.map((item, i) => {
      return { ...item, order: i }
    })
  }

  handleDelete = i => {
    const temp = this.state.waypoints.filter((_, index) => {
      return i !== index
    })
    const reOrder = this.updateOrder(temp)
    this.setState({ waypoints: reOrder })
    this.deleteMapMarkers(i)
  }

  handleEdit = (e, i) => {
    const mapped = this.state.waypoints.map((item, index) => {
      if (index === i) {
        return { ...item, name: e.target.value }
      }
      return item
    })
    this.setState({ waypoints: mapped })
  }
  //map through and edit titles
  deleteMapMarkers = i => {
    this.state.markers.forEach((item, index) => {
      if (i === index && item) {
        item.setMap(null)
      }
    })
    let updatedMarkers = this.state.markers.filter((_, index) => {
      return i !== index
    })
    updatedMarkers.forEach((item, index) => {
      item.setLabel(`${index + 1}`)
    })

    this.setState({ markers: updatedMarkers })
  }

  render() {
    return (
      <MapWrapper>
        <CreateTripPanel map={this.state.map} />
        <div
          id="createTripMap"
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        <i
          id="plus-icon"
          className="fas fa-plus fa-4x"
          onClick={this.addWaypoint}
        />
      </MapWrapper>
    )
  }
}

const mapStateToProps = state => {
  return { userId: state.auth.user.id }
}
export default connect(mapStateToProps)(CreateTripMap)
