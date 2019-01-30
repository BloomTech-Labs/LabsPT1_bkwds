import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import * as d3 from "d3"

const margin = { top: 50, right: 50, bottom: 50, left: 50 }
const width = 749 - margin.left - margin.right
const height = 250 - margin.top - margin.bottom

const ElevationChartStyles = styled.div`
  position: absolute;
  right: ${margin.right}px;
  z-index: 1000;
  svg {
    /* height: ${height + margin.top + margin.bottom}px;
    width: ${width + margin.left + margin.right}px; */
  }
`

class ElevationChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state
    const { distances, elevations } = this.props

    const cumulativeDistances = distances.reduce(
      (acc, curr) => {
        return acc.concat(acc[acc.length - 1] + curr)
      },
      [0]
    )

    console.log("CUMULATIVE DISTANCES:", cumulativeDistances)

    if (distances.length && !prevProps.distances.length) {
      console.log("CREATING DATA OBJ!")
      // const newData = [
      //   { x: 0, y: 54 },
      //   { x: 1, y: 72 },
      //   { x: 10, y: 50 },
      //   { x: 92, y: 12 }
      // ]
      const newData = [
        { x: 0, y: 1588 },
        { x: 3631, y: 1631 },
        { x: 5528, y: 1618 },
        { x: 9995, y: 1602 },
        { x: 12081, y: 1626 }
      ]
      console.log("NEW DATA:", newData)

      this.setState({ data: newData })
    }

    if (data.length && !prevState.data.length) {
      console.log("RENDERING CHART")
      this.drawChart()
    }
  }

  drawChart = () => {
    const { data } = this.state
    console.log("DRAWING CHART, DATA:", data)

    const svg = d3
      .select("#elevationChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      // MOVE 2 ATTRS INTO RESPONSIFY FUNCTION!
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMid")
      // .style("")
      .append("g")
      // .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("transform", `translate(${margin.left}, 0)`)

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, co => co.x), d3.max(data, co => co.x)])
      .range([0, width])

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(data.length))

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, co => co.y), d3.max(data, co => co.y)])
      .range([height, 0])

    svg.append("g").call(d3.axisLeft(yScale).ticks(data.length - 1))

    const area = d3
      .area()
      .x(d => xScale(d.x))
      .y0(yScale(yScale.domain()[0]))
      .y1(d => yScale(d.y))
    // .curve(d3.curveCatmullRom.alpha(0.25))

    svg
      .selectAll(".elevationChartLine")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "elevationChartLine")
      .attr("d", area(data))
      .style("stroke", "#787979")
      .style("stroke-opacity", 0.05)
      .style("stroke-width", 1)
      .style("fill", "#787979")
      .style("fill-opacity", 0.05)
  }

  render() {
    const { data } = this.state
    console.log("DATA!", data)

    return (
      <ElevationChartStyles>
        <div>
          Elevation Chart:
          {data.length > 0 && <div id="elevationChart" />}
        </div>
      </ElevationChartStyles>
    )
  }
}

// ElevationChart.defaultProps = {}

ElevationChart.propTypes = {
  elevations: PropTypes.array.isRequired,
  distances: PropTypes.array.isRequired
}

export default ElevationChart
