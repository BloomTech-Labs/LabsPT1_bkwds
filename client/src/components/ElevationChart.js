import React, { Component } from "react"
import PropTypes from "prop-types"

class ElevationChart extends Component {
  render() {
    return (
      <div>
        <div>ELEVATION CHART</div>
      </div>
    )
  }
}

ElevationChart.propTypes = {
  elevations: PropTypes.array.isRequired
}

export default ElevationChart
