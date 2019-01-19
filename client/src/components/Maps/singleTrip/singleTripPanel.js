import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { WaypointPropTypes } from "../../propTypes"
import { Button } from "../../../styles/theme/styledComponents"
import moment from "moment"
import { TripPropTypes } from "../../propTypes"
import { toggleWaypoint } from "../../../redux/actions/waypoints"

import * as s from "../../../styles/CreateTripPanel.styles"
import "../createTrip/custom.css"

class SingleTripPanel extends React.Component {
  state = {}

  render() {
    return (
      <Fragment>
        <s.Panel>
          <s.PanelHeader>{this.props.trip.name}</s.PanelHeader>
          <s.DateLabel>
            Start: {moment(this.props.trip.start).format("YYYY-MM-DD")} - End:{" "}
            {moment(this.props.trip.end).format("YYYY-MM-DD")}
          </s.DateLabel>
          <ul>
            {this.props.waypoints &&
              this.props.waypoints.map(waypoint => (
                <li key={waypoint.id}>
                  <div>
                    <div>{waypoint.name}</div>
                    <div>
                      ETA: {moment(waypoint.start).format("YYYY-MM-DD")}
                    </div>
                    <div>
                      Status: Checked In @ {moment(waypoint.start).format("H")}
                    </div>
                    {waypoint.complete ? (
                      <Button
                        onClick={() =>
                          this.props.toggleWaypoint(
                            waypoint.id,
                            waypoint.complete
                          )
                        }
                      >
                        I made it!
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          this.props.toggleWaypoint(
                            waypoint.id,
                            waypoint.complete
                          )
                        }
                      >
                        Not here yet
                      </Button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </s.Panel>
      </Fragment>
    )
  }
}

SingleTripPanel.propTypes = {
  pending: PropTypes.bool.isRequired,
  waypoints: PropTypes.arrayOf(WaypointPropTypes),
  trip: TripPropTypes
}

const mapStateToProps = (state, ownProps) => ({
  pending: state.waypoints.pending,
  waypoints: state.waypoints.list,
  trip: state.trips.trips[ownProps.tripId]
})

const mapDispatchToProps = { toggleWaypoint }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTripPanel)
