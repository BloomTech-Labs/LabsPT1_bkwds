import React from "react"
import * as s from "./components"
import { connect } from "react-redux"
import moment from "moment"
import PropTypes from "prop-types"
import { TripPropTypes } from "../../propTypes"
import { Button } from "../../../styles/theme/styledComponents"
import { toggleWaypoint } from "../../../redux/actions/trips"
import marker from "../../icons/orange-marker.svg"
import startMarker from "../../icons/green-marker.svg"
import endMarker from "../../icons/black-marker.svg"
import * as util from "./mapUtil"

class ActiveTripPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      velocity: 1.4,
      polylines: null,
      markers: [],
      timeGaps: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.renderWaypoints()
      this.drawPolylines()
      this.calcTimeGaps()
    }, 500)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.waypoints !== this.props.waypoints) {
      this.renderWaypoints()
      this.drawPolylines()
    }
  }

  drawPolylines = () => {
    if (this.state.polylines !== null) {
      this.state.polylines.active.setMap(null)
      this.state.polylines.complete.setMap(null)
      this.state.polylines.current.setMap(null)
    }

    let completeIndex = 0
    for (let i = 0; i < this.props.waypoints.length; i++) {
      if (!this.props.waypoints[i].complete) {
        completeIndex = i
        break
      }
    }

    const completed = this.props.waypoints.slice(0, completeIndex)
    const active = this.props.waypoints.slice(
      completeIndex,
      this.props.waypoints.length + 1
    )
    const current = this.props.waypoints.slice(
      completeIndex - 1,
      completeIndex + 2
    )
    const completePath = completed.map(waypoint => {
      return { lat: waypoint.lat, lng: waypoint.lon }
    })

    const activePath = active.map(waypoint => {
      return { lat: waypoint.lat, lng: waypoint.lon }
    })

    const currentPath = current.map(waypoint => {
      return { lat: waypoint.lat, lng: waypoint.lon }
    })
    const completePolyline = new window.google.maps.Polyline({
      path: completePath,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    })

    const currentPolyline = new window.google.maps.Polyline({
      path: currentPath,
      strokeColor: "#008000",
      stokeOpacity: 1.0,
      stokeWeight: 2
    })
    const activePolyline = new window.google.maps.Polyline({
      path: activePath,
      strokeColor: "#000000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    })

    completePolyline.setMap(window.map)
    activePolyline.setMap(window.map)
    currentPolyline.setMap(window.map)
    this.setState({
      polylines: {
        active: activePolyline,
        complete: completePolyline,
        current: currentPolyline
      }
    })
  }

  renderWaypoints = () => {
    let markers = []
    const baseIcon = {
      anchor: new window.google.maps.Point(15, 30),
      scaledSize: new window.google.maps.Size(30, 30),
      labelOrigin: new window.google.maps.Point(15, 13)
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
    this.props.waypoints.map((item, i) => {
      const icon =
        i === 0
          ? icons.start
          : i === this.props.waypoints.length - 1
          ? icons.end
          : icons.marker

      let center = { lat: item.lat, lng: item.lon }
      const marker = new window.google.maps.Marker({
        position: center,
        map: window.map,
        icon,
        title: item.name,
        label: {
          text: `${i + 1}`,
          color: "white",
          fontFamily: "Wals",
          fontWeight: "bold"
        }
      })
      markers.push(marker)
    })
    this.setState({ markers })
  }

  calcTimeGaps = () => {
    const { velocity } = this.state

    if (this.state.markers.length > 1) {
      let latLngs = this.state.markers.map(marker => ({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
      }))

      const { timeGaps } = latLngs.reduce(
        (acc, curr, i, arr) => {
          if (i === arr.length - 1) return acc
          const distances = acc.distances.concat(
            util.calcDistance(
              curr.lat,
              curr.lng,
              arr[i + 1].lat,
              arr[i + 1].lng
            )
          )
          const timeGaps = acc.timeGaps.concat(
            util.calcTimeGap(distances[i], velocity)
          )
          return { distances, timeGaps }
        },
        { distances: [], timeGaps: [] }
      )
      this.setState({ timeGaps })
    }
  }

  isLate = (checkinTime, targetGapTime, targetEndTime) => {
    const unixRealEndTimeInSecond = moment(checkinTime).format("X")

    const unixTargetEndTimeInSecond = moment(targetEndTime).format("X")

    return unixRealEndTimeInSecond + targetEndTime > unixTargetEndTimeInSecond
  }

  render() {
    const { timeGaps } = this.state
    const { waypoints } = this.props
    return (
      <s.Panel>
        {/* <s.PanelHeader>{this.props.trip.name}</s.PanelHeader>
        <s.DateLabel>
          Start: {moment(this.props.trip.start).format("YYYY-MM-DD")} - End:{" "}
          {moment(this.props.trip.end).format("YYYY-MM-DD")}
        </s.DateLabel> */}
        <s.WaypointTracker>
          {waypoints &&
            waypoints.map((waypoint, i) => (
              <s.WaypointStepper key={waypoint.id}>
                <div>
                  <h4>
                    {waypoint.name}{" "}
                    {timeGaps.length > 0 &&
                      i > 0 &&
                      i <= timeGaps.length &&
                      waypoints[i - 1] &&
                      this.isLate(
                        waypoints[i - 1].start,
                        timeGaps[i - 1],
                        waypoint.start
                      ) &&
                      !waypoint.complete && (
                        <i className="fa fa-exclamation-circle" />
                      )}
                  </h4>
                  <div>
                    ETA: {moment(waypoint.start).format("YYYY-MM-DD HH:mm")}
                  </div>
                  <div>
                    Status: Checked In @{" "}
                    {moment(waypoint.start).format("HH:mm")}
                  </div>
                </div>
                <div>
                  {waypoint.complete ? (
                    <Button
                      onClick={() => this.props.toggleWaypoint(waypoint.id)}
                    >
                      <i className="fa fa-check" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => this.props.toggleWaypoint(waypoint.id)}
                    >
                      <i className="fa fa-times" />
                    </Button>
                  )}
                </div>
              </s.WaypointStepper>
            ))}
        </s.WaypointTracker>
      </s.Panel>
    )
  }
}

ActiveTripPanel.propTypes = {
  trip: TripPropTypes,
  waypoints: PropTypes.array.isRequired,
  toggleWaypoint: PropTypes.func.isRequired
}

const mapStateToProps = ({ trips }) => ({
  trip: trips.activeTrip,
  waypoints: trips.activeTrip && trips.activeTrip.waypoints
})

export default connect(
  mapStateToProps,
  { toggleWaypoint }
)(ActiveTripPanel)
