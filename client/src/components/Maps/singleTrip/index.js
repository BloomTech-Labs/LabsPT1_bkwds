import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { MapWrapper } from "../../../styles/CreateTrip.styles"
import TripPanel from "../singleTrip/tripPanel"
import ActiveTripPanel from "./activePanel"
import styled from "styled-components"

import { TripPropTypes, getDefaultTripProps } from "../../propTypes"
import { getSingleTrip } from "../../../redux/actions/trips"
import { media } from "../../../styles/theme/mixins"
import marker from "../../icons/orange-marker.svg"
import startMarker from "../../icons/green-marker.svg"
import endMarker from "../../icons/black-marker.svg"

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

  componentDidMount() {
    this.props.getSingleTrip(this.props.tripId)
    window.elevation = new window.google.maps.ElevationService()
  }

  componentDidUpdate() {
    const { trip } = this.props
    if (trip && trip.waypoints) this.renderMap(trip, trip.waypoints)
    this.drawPolyline(trip.waypoints)
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isSidebarOpen !== this.props.isSidebarOpen) return false
    return true
  }

  renderMap = (center, waypoints) => {
    let latLngs
    const Tripmap = document.getElementById("Tripmap")
    window.map = new window.google.maps.Map(Tripmap, {
      center,
      zoom: 9,
      disableDefaultUI: true
    })
    if (waypoints) {
      latLngs = this.renderWaypoints(waypoints)
      const bounds = new window.google.maps.LatLngBounds()
      latLngs.forEach(latLng => bounds.extend(latLng))
      window.map.fitBounds(bounds)
      window.map.setCenter(bounds.getCenter())
    }
  }

  // Attach waypoints to map
  renderWaypoints = waypoints => {
    const latLngs = []
    const { maps } = window.google
    const baseIcon = {
      anchor: new maps.Point(15, 30),
      scaledSize: new maps.Size(30, 30),
      labelOrigin: new maps.Point(15, 13)
    }
    const icons = {
      start: {
        url: startMarker,
        ...baseIcon
      },
      end: {
        url: endMarker,
        ...baseIcon
      },
      marker: {
        url: marker,
        ...baseIcon
      }
    }

    waypoints.forEach((waypoint, i) => {
      const position = {
        lat: waypoint.lat,
        lng: waypoint.lon
      }
      const icon =
        i === 0
          ? icons.start
          : i === waypoints.length - 1
          ? icons.end
          : icons.marker
      const label = {
        text: waypoint.order.toString(),
        color: "white",
        fontFamily: "Wals",
        fontWeight: "bold"
      }
      const wp = new maps.Marker({
        icon,
        position,
        map: window.map,
        title: waypoint.name,
        label
      })
      wp.setMap(window.map)
      latLngs.push(position)
    })
    return latLngs
  }

  drawPolyline = waypoints => {
    const path = waypoints.map(w => ({
      lat: w.lat,
      lng: w.lon
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

  // Add conditional rendering for active Trip
  render() {
    if (this.props.trip !== null) {
      return (
        <SingleTripMapStyles>
          <MapWrapper>
            {!this.props.trip.inProgress ? (
              <TripPanel drawPolyline={this.drawPolyline} />
            ) : (
              <ActiveTripPanel />
            )}
            <div
              style={{ width: "100%", height: "100%", position: "absolute" }}
              id="Tripmap"
            />
          </MapWrapper>
        </SingleTripMapStyles>
      )
    } else {
      return null
    }
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
