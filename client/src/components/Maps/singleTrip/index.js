import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { SERVER_URI } from "../../../config"
import Axios from "axios"

import { getSingleTrip } from "../../../redux/actions/trips"

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

class SingleTripMap extends React.Component {
  state = {
    trip: {}
  }

  componentDidMount() {
    console.log("SINGLE TRIP MAP MOUNTED, PROPS:", this.props)
    const { tripId } = this.props
    this.props.getSingleTrip(tripId)
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

  //fetches trip details
  // async fetchTrip(tripId) {
  //   const res = await Axios.get(`${SERVER_URI}/trips/${tripId}`)
  //   const { data } = await res
  //   return data
  // }

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

export default withRouter(
  connect(
    mapStateToProps,
    { getSingleTrip }
  )(SingleTripMap)
)
