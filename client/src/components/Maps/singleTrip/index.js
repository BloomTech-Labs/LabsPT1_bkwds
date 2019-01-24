import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import styled from "styled-components"

import { TripPropTypes, getDefaultTripProps } from "../../propTypes"
import { getSingleTrip } from "../../../redux/actions/trips"
import { media } from "../../../styles/theme/mixins"

const SingleTripMapStyles = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  margin-left: -50px;
  ${media.tablet`
    margin-left: 0;
  `}
`

const dashSymbol = {
  path: "M 0,-1 0,1",
  strokeOpacity: 1,
  scale: 3
}

class SingleTripMap extends React.Component {
  static defaultProps = {
    getSingleTrip: () => {},
    trip: getDefaultTripProps(),
    tripId: ""
  }

  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  componentDidMount() {
    this.props.getSingleTrip(this.props.tripId)
  }

  componentDidUpdate() {
    const { trip } = this.props
    const lat = trip.lat
    const lng = trip.lon
    const center = { lat, lng }
    if (trip && trip.waypoints) this.renderMap(center, trip.waypoints)
    this.drawPolyline()
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isSidebarOpen !== this.props.isSidebarOpen) return false
    return true
  }

  //Attaches Map to div
  // TODO? Store users last zoom level for UX improvment - otherwise default to 9
  renderMap = (center, waypoints) => {
    window.map = new window.google.maps.Map(this.mapRef.current, {
      center: center,
      zoom: 9,
      disableDefaultUI: true
    })
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
    const { waypoints } = this.props.trip
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
    return <SingleTripMapStyles ref={this.mapRef} />
  }
}

SingleTripMap.propTypes = {
  getSingleTrip: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  trip: TripPropTypes,
  tripId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  trip: state.trips.activeTrip,
  isSidebarOpen: state.navigation.isSidebarOpen
})

export default connect(
  mapStateToProps,
  { getSingleTrip }
)(SingleTripMap)
