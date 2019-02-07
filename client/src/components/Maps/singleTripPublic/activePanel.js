import React from "react"
import * as s from "./components"
import { connect } from "react-redux"
import moment from "moment"
import PropTypes from "prop-types"
import { TripPropTypes } from "../../propTypes"
class ActiveTripPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startPosition: {},
      currentPosition: {},
      endPosition: {}
    }
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          startPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    } else {
      console.log("Geolocation Not available")
    }
  }

  render() {
    return (
      <s.Panel>
        <s.WaypointTracker>
          {this.props.waypoints &&
            this.props.waypoints.map(waypoint => (
              <s.WaypointStepper key={waypoint.id}>
                <div>
                  <h4>{waypoint.name}</h4>
                  <div>
                    ETA: {moment(waypoint.start).format("YYYY-MM-DD HH:mm")}
                  </div>
                  <div>
                    Status: Checked In @{" "}
                    {moment(waypoint.start).format("HH:mm")}
                  </div>
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
  waypoints: PropTypes.array.isRequired
}

const mapStateToProps = ({ trips }) => ({
  trip: trips.activeTrip,
  waypoints: trips.activeTrip && trips.activeTrip.waypoints
})

export default connect(mapStateToProps)(ActiveTripPanel)
