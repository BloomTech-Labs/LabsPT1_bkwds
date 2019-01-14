import React from "react"
import Styled from "styled-components"
import { SERVER_URI } from "../../../config"
import Axios from "axios"

<<<<<<< HEAD
//TODO - fetch trip data and apply it to map.
export default class Map extends React.Component {
  state = {
    center: { lat: -34.397, lng: 150.644 },
    markers: [{ lat: -34.197, lng: 150.474 }]
=======
export default class SingleTripMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trip: {}
    }
>>>>>>> trip features added - edit and delete wip
  }

  componentDidMount() {
    this.fetchTrip(this.props.tripId).then(res => {
      this.setState({ trip: res }, () => {
        const center = { lat: this.state.trip.lat, lng: this.state.trip.lon }
        this.renderMap(center, this.state.trip.waypoints)
      })
    })
  }
  //Attaches Map to div
  // TODO? Store users last zoom level for UX improvment - otherwise default to 9
  renderMap = (center, waypoints) => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 9,
      disableDefaultUI: true
    })
    if (waypoints) {
      this.renderWaypoints(waypoints, map)
    }
  }

  //Attach waypoints to map
  renderWaypoints = (waypoints, map) => {
    waypoints.forEach(waypoint => {
      const center = {
        lat: parseFloat(waypoint.lat.$numberDecimal),
        lng: parseFloat(waypoint.lon.$numberDecimal)
      }
      new window.google.maps.Marker({
        position: center,
        map: map,
        title: waypoint.name,
        label: parseInt(waypoint.order)
      }).setMap(map)
    })
  }

  //fetches trip details
  async fetchTrip(tripId) {
    const res = await Axios.get(`${SERVER_URI}/trips/${tripId}`)
    const { data } = await res
    return data
  }

  render() {
    return (
      <div
        style={{ width: "100%", height: "100%", position: "abso" }}
        id="map"
      />
    )
  }
}
