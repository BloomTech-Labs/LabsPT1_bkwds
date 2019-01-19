import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { WaypointPropTypes } from "../../propTypes"
import { Button } from "../../../styles/theme/styledComponents"
import moment from "moment"

import * as s from "../../../styles/CreateTripPanel.styles"
import "../createTrip/custom.css"

class SingleTripPanel extends React.Component {
  state = {}

  render() {
    return (
      <Fragment>
        <s.Panel>
          <s.PanelHeader>{this.props.name}</s.PanelHeader>
          <s.DateLabel>
            Start: {moment(this.props.start).format("YYYY-MM-DD")} - End:{" "}
            {moment(this.props.end).format("YYYY-MM-DD")}
          </s.DateLabel>
          <ul>
            {this.props.waypoints.map(waypoint => (
              <li key={waypoint.id}>
                <div>
                  <div>{waypoint.name}</div>
                  <div>ETA: {moment(waypoint.start).format("YYYY-MM-DD")}</div>
                  <div>
                    Status: Checked In @ {moment(waypoint.start).format("H")}
                  </div>
                  {waypoint.complete ? (
                    <Button>I made it!</Button>
                  ) : (
                    <Button>Not here yet</Button>
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
  name: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  waypoints: PropTypes.arrayOf(WaypointPropTypes)
}

export default SingleTripPanel
