import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { MapWrapper } from "../../../styles/CreateTrip.styles"
import TripPanel from "../singleTrip/tripPanel"
import ActiveTripPanel from "./activePanel"
import styled from "styled-components"

import { TripPropTypes, getDefaultTripProps } from "../../propTypes"
import { getSingleTrip, removeActiveTrip } from "../../../redux/actions/trips"
import { media } from "../../../styles/theme/mixins"

const SingleTripMapStyles = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  margin-left: ${props => (props.publicView ? "0" : "-50px")};
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
    removeActiveTrip: () => {},
    trip: getDefaultTripProps(),
    tripId: ""
  }

  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  componentDidMount() {
    this.props.getSingleTrip(this.props.tripId)
    window.elevation = new window.google.maps.ElevationService()
  }

  componentDidUpdate(prevProps) {
    if (this.props.trip !== prevProps.trip && prevProps.trip == null) {
      this.renderMap({ lat: this.props.trip.lat, lng: this.props.trip.lon })
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isSidebarOpen !== this.props.isSidebarOpen) return false
    return true
  }

  //At page change remove active trip/ set null so successive page changes don't have
  // stale activeTrip data
  componentWillUnmount() {
    this.props.removeActiveTrip()
  }
  //Attaches Map to div
  // TODO? Store users last zoom level for UX improvment - otherwise default to 9
  renderMap = center => {
    window.map = new window.google.maps.Map(
      // document.getElementById("Tripmap"),
      this.mapRef.current,
      {
        center: center,
        zoom: 14,
        gestureHandling: "greedy",
        disableDefaultUI: true
      }
    )
  }

  drawPolyline = markers => {
    const path = markers.map(marker => ({
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng()
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
          repeat: "15px"
        }
      ]
    })

    window.polyline = polyline

    polyline.setMap(window.map)
  }

  render() {
    if (this.props.trip !== null) {
      return (
        <SingleTripMapStyles publicView={this.props.isPublic}>
          <MapWrapper>
            {!this.props.trip.inProgress ? (
              <TripPanel
                drawPolyline={this.drawPolyline}
                mapRef={this.mapRef}
              />
            ) : (
              <ActiveTripPanel isPublic={this.props.isPublic} />
            )}
            <div
              style={{ width: "100%", height: "100%", position: "absolute" }}
              id="Tripmap"
              ref={this.mapRef}
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
  removeActiveTrip: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  trip: TripPropTypes,
  isPublic: PropTypes.bool.isRequired,
  tripId: PropTypes.string.isRequired
}
SingleTripMap.defaultProps = {
  isPublic: false
}

const mapStateToProps = state => ({
  trip: state.trips.activeTrip,
  isSidebarOpen: state.navigation.isSidebarOpen
})

export default connect(
  mapStateToProps,
  { getSingleTrip, removeActiveTrip }
)(SingleTripMap)
