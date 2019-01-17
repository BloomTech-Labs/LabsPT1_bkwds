import React from "react"
import { connect } from "react-redux"

import { getSingleTrip } from "../../../redux/actions/trips"

class SingleTripMap extends React.Component {
  componentDidMount() {
    this.props.getSingleTrip(this.props.tripId)
  }

  componentDidUpdate() {
    const { trip } = this.props
    const center = {
      lat: parseFloat(trip.lat),
      lng: parseFloat(trip.lon)
    }
    console.log("SINGLE TRIP COMPONENT UPDATED! PROPS:", this.props)
    this.renderMap(center, trip.waypoints)
  }

  //Attaches Map to div
  // TODO? Store users last zoom level for UX improvment - otherwise default to 9
  renderMap = (center, waypoints) => {
    const map = new window.google.maps.Map(document.getElementById("Tripmap"), {
      center: center,
      zoom: 9,
      disableDefaultUI: true
    })
    if (waypoints) {
      this.renderWaypoints(waypoints, map)
    }
  }
  // renderWaypointList = waypoints => {}

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
        label: waypoint.order
      }).setMap(map)
    })
  }

  render() {
    return (
      <div
        style={{ width: "100%", height: "100%", position: "absolute" }}
        id="Tripmap"
      />
    )
  }
}

const mapStateToProps = state => ({
  trip: state.trips.activeTrip
})

export default connect(
  mapStateToProps,
  { getSingleTrip }
)(SingleTripMap)

// const PanelHeader = Styled.h2`
//     font-size:1.5rem;
//     padding:.5rem;
// `

// const WaypointList = Styled.div`
//     overflow:scroll;
// `
// const Waypoint = Styled.div`
//     align-items:center;
//     width: 90%;
//     display:flex;
//     margin:0 auto;
// `
