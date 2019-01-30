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

  text {
    font-size: 11px;
    stroke: none;
    fill: #999;
  }

  path.domain {
    fill: none;
    stroke: #aaa;
  }

  g.tick {
    line {
      color: #999;
    }
  }

  .crossBar line {
    stroke: #333;
    stroke-width: 1px;
    pointer-events: none;
    /* shape-rendering: crispEdges; */
  }

  .chartOverlay {
    fill: none;
    pointer-events: all;
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
    // const cumulativeDistances = distances.reduce(
    //   (acc, curr) => acc.concat(acc[acc.length - 1] + curr),
    //   [0]
    // )

    const startDistance = 0
    const endDistance = distances.reduce((acc, curr) => acc + curr, 0)
    // endDistance divided by the number of elevation samples
    const sampleUnit = endDistance / 100
    console.log("END DISTNACE:", endDistance)

    if (distances.length && !prevProps.distances.length) {
      const newData = elevations.reduce((acc, curr, i) => {
        const dist = sampleUnit * (i + 1)
        return acc.concat({ x: dist, y: curr.elevation })
      }, [])
      this.setState({ data: newData })
    }

    if (data.length && !prevState.data.length) {
      this.drawChart()
    }
  }

  drawChart = () => {
    const { data } = this.state
    console.log("DRAWING CHART, DATA:", data)

    const bisect = d3.bisector(function(d) {
      return d.x
    }).left

    const svg = d3
      .select("#elevationChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      // MOVE 2 ATTRS INTO RESPONSIFY FUNCTION!
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMid")
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, co => co.x), d3.max(data, co => co.x)])
      .range([0, width])

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(6))

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, co => co.y), d3.max(data, co => co.y)])
      .range([height, 0])

    svg.append("g").call(d3.axisLeft(yScale).ticks(7))

    const area = d3
      .area()
      .x(d => xScale(d.x))
      .y0(yScale(yScale.domain()[0]))
      .y1(d => yScale(d.y))
      .curve(d3.curveCatmullRom.alpha(0.005))

    // const line = d3
    //   .line()
    //   .x(d => xScale(d.x))
    //   .y(d => yScale(d.y))

    svg
      .append("path")
      .attr("d", area(data))
      .style("stroke", "#787979")
      .style("stroke-opacity", 0.2)
      .style("stroke-width", 1)
      .style("fill", "#787979")
      .style("fill-opacity", 0.15)

    // .selectAll(".line")
    // .data(data)
    // .enter()
    // .append("path")
    // .attr("class", "line")
    // .attr("d", line(data))
    // .style("stroke", "#FF9900")
    // .style("stroke-width", 2)
    // .style("fill", "none")

    // svg
    //   .selectAll(".elevationChartLine")
    //   .data(data)
    //   .enter()
    //   .append("path")
    //   .attr("class", "elevationChartLine")
    //   .attr("d", area(data))
    //   .style("stroke", "#787979")
    //   .style("stroke-opacity", 0.05)
    //   .style("stroke-width", 1)
    // .style("fill", "#787979")
    // .style("fill-opacity", 0.05)

    var crossBar = svg
      .append("g")
      .attr("class", "crossBar")
      .style("display", "none")

    crossBar
      .append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", height)
      .attr("y2", 27.5)
    // .style("")

    // crossBar
    //   .append("rect")
    //   .attr("x", 0)
    //   .attr("y", 20)
    //   .height("height", 47)
    //   .style("left", (d3.event.pageX) + "px")

    crossBar
      .append("text")
      .attr("x", 9)
      .attr("dy", ".35em")

    svg
      .append("rect")
      .attr("class", "chartOverlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() {
        crossBar.style("display", null)
      })
      .on("mouseout", function() {
        crossBar.style("display", "none")
      })
      .on("mousemove", mousemove)

    function mousemove() {
      var x0 = xScale.invert(d3.mouse(this)[0]),
        i = bisect(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.x > d1.x - x0 ? d1 : d0
      crossBar.attr(
        "transform",
        // "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"
        `translate(${xScale(d.x)}, 0)`
      )
      crossBar.select("text").text(d.y)
    }
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
