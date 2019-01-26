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
    const lat = trip.lat
    const lng = trip.lon
    const center = { lat, lng }
    if (trip && trip.waypoints) this.renderMap(center)
    this.drawPolyline(trip.waypoints)
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isSidebarOpen !== this.props.isSidebarOpen) return false
    return true
  }

  renderMap = center => {
    window.map = new window.google.maps.Map(
      document.getElementById("Tripmap"),
      {
        center: center,
        zoom: 9,
        disableDefaultUI: true
      }
    )
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
