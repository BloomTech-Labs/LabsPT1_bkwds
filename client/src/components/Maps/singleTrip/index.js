import React from "react"
import { connect } from "react-redux"
import SingleTripPanel from "./singleTripPanel"
import { MapWrapper } from "../../../styles/MapWrapper.styles"
import { TripPropTypes } from "../../propTypes"
import { getWaypointsByTrip } from "../../../redux/actions/waypoints"
import PropTypes from "prop-types"
import { WaypointPropTypes } from "../../propTypes"

const dashSymbol = {
  path: "M 0,-1 0,1",
  strokeOpacity: 1,
  scale: 3
}

class SingleTripMap extends React.Component {
  componentDidMount() {
    this.props.getWaypointsByTrip(this.props.trip.id)
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isWaypointsPending && !this.props.isWaypointsPending) {
      const { trip } = this.props
      const lat = trip.lat
      const lng = trip.lon
      const center = { lat, lng }
      this.renderMap(center, this.props.waypoints)
      this.drawPolyline()
    }
  }

  //Attaches Map to div
  // TODO? Store users last zoom level for UX improvment - otherwise default to 9
  renderMap = (center, waypoints) => {
    window.map = new window.google.maps.Map(
      document.getElementById("SingleTripmap"),
      {
        center: center,
        zoom: 9,
        disableDefaultUI: true
      }
    )
    if (waypoints) {
      this.renderWaypoints(waypoints)
    }
  }

  // Attach waypoints to map
  renderWaypoints = waypoints => {
    waypoints.forEach(waypoint => {
      const center = {
        lat: parseFloat(waypoint.lat.$numberDecimal),
        lng: parseFloat(waypoint.lon.$numberDecimal)
      }
      new window.google.maps.Marker({
        position: center,
        map: window.map,
        title: waypoint.name,
        label: waypoint.order.toString()
      }).setMap(window.map)
    })
  }

  drawPolyline = () => {
    const { waypoints } = this.props
    const path = waypoints.map(w => ({
      lat: parseFloat(w.lat.$numberDecimal),
      lng: parseFloat(w.lon.$numberDecimal)
    }))

    const polyline = new window.google.maps.Polyline({
      path,
      strokeColor: "#1e306e",
      strokeOpacity: 0,
      strokeWeight: 2,
      icons: [
        {
          icon: dashSymbol,
          offset: 0,
          repeat: "20px"
        }
      ]
    })

    window.polyline = polyline

    polyline.setMap(window.map)
  }

  render() {
    const { name, start, end } = this.props.trip
    const { waypoints } = this.props
    const props = { name, start, end, waypoints }
    return (
      <MapWrapper>
        {this.props.waypoints && <SingleTripPanel {...props} />}
        <div
          style={{ width: "100%", height: "100%", position: "absolute" }}
          id="SingleTripmap"
        />
      </MapWrapper>
    )
  }
}

SingleTripMap.propTypes = {
  isWaypointsPending: PropTypes.bool.isRequired,
  trip: TripPropTypes,
  waypoints: PropTypes.arrayOf(WaypointPropTypes)
}

const mapStateToProps = (state, ownProps) => ({
  isWaypointsPending: state.waypoints.pending,
  trip: state.trips.trips[ownProps.tripId],
  waypoints: state.waypoints.list
})

export default connect(
  mapStateToProps,
  { getWaypointsByTrip }
)(SingleTripMap)
