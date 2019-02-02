import React, { Component } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

import Chevron from "./icons/ChevronSvg"
import ChartIcon from "./icons/ChartSvg"
import * as s from "../styles/ElevationChart.styles"

const margin = { top: 0, right: 0, bottom: 15, left: 50 }
const width = 750 - margin.left - margin.right
const height = 155 - margin.top - margin.bottom
const xAxisTicks = 8
const yAxisTicks = 6

export const numOfSamples = 100
export const metersToMiles = m => m * 0.000621371
export const metersToFeet = m => m * 3.28084

function fromLatLngToPoint(latLng, map) {
  const topRight = map
    .getProjection()
    .fromLatLngToPoint(map.getBounds().getNorthEast())
  const bottomLeft = map
    .getProjection()
    .fromLatLngToPoint(map.getBounds().getSouthWest())
  const scale = Math.pow(2, map.getZoom())
  const worldPoint = map.getProjection().fromLatLngToPoint(latLng)
  const point = new window.google.maps.Point(
    (worldPoint.x - bottomLeft.x) * scale,
    (worldPoint.y - topRight.y) * scale
  )
  return point
}

const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  for (var i = arr1.length; i--; ) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

const makeXGridlines = xScale => d3.axisBottom(xScale).ticks(xAxisTicks)
const makeYGridlines = yScale => d3.axisLeft(yScale).ticks(yAxisTicks)

class ElevationChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isHidden: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state
    const { distances, elevations } = this.props
    const startDistance = 0
    const endDistance = distances.reduce(
      (acc, curr) => acc + curr,
      startDistance
    )

    const makeFreshData = data =>
      data.reduce((acc, curr, i) => {
        const dist = sampleUnit * (i + 1)
        return acc.concat({ x: dist, y: curr.elevation, ...curr })
      }, [])

    const elevationsWithGrades = elevations.reduce((acc, curr, i, arr) => {
      if (i === arr.length - 1) {
        return acc.concat({ ...curr, grade: 0 })
      }
      return acc.concat({
        ...curr,
        grade: (arr[i + 1].elevation - curr.elevation) / curr.elevation
      })
    }, [])

    // endDistance divided by the number of elevation samples
    const sampleUnit = endDistance / numOfSamples

    if (distances.length && !prevProps.distances.length) {
      const newData = makeFreshData(elevationsWithGrades)
      this.setState({ data: newData })
    }

    // HANDLE DRAWING OR DESTROYING OF CHART:
    if (!arraysEqual(distances, prevProps.distances)) {
      if (data.length && !prevState.data.length) {
        return this.drawChart()
      }

      this.destroyChart()
      const newData = makeFreshData(elevationsWithGrades)
      this.setState({ data: newData }, () => this.drawChart())
    }
  }

  destroyChart = () => {
    console.log("DESTROYING CHART")
    d3.selectAll("#elevationChart > *").remove()
  }

  toggleChart = () => {
    const { isHidden } = this.state
    this.setState({
      isHidden: !isHidden
    })
  }

  drawChart = () => {
    console.log("DRAWING CHART")
    const { data } = this.state
    const bisect = d3.bisector(function(d) {
      return d.x
    }).left

    const svg = d3
      .select("#elevationChart")
      .append("svg")
      .attr("width", 750)
      .attr("height", 155)
      .attr("viewBox", "0 0 " + width + " " + 160)
      .attr("preserveAspectRatio", "xMinYMid")
      .append("g")
      .attr("transform", `translate(${margin.left}, 2.5)`)

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, width])

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(xAxisTicks)
          .tickFormat(d => d3.format(".1f")(metersToMiles(d)) + " mi")
          .tickSize(0)
          .tickPadding(9)
      )

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, co => co.y), d3.max(data, co => co.y)])
      .range([height, 0])

    svg.append("g").call(
      d3
        .axisLeft(yScale)
        .ticks(yAxisTicks)
        .tickFormat(d => d3.format(",.0f")(metersToFeet(d)) + " ft")
        .tickSize(0)
        .tickPadding(8)
    )

    // Make X grid:
    svg
      .append("g")
      .attr("class", "elevationChartGrid")
      .attr("transform", `translate(0, ${height})`)
      .call(
        makeXGridlines(xScale)
          .tickSize(-height)
          .tickFormat("")
      )

    // Make Y grid:
    svg
      .append("g")
      .attr("class", "elevationChartGrid")
      .call(
        makeYGridlines(yScale)
          .tickSize(-width)
          .tickFormat("")
      )

    const area = d3
      .area()
      .x(d => xScale(d.x))
      .y0(yScale(yScale.domain()[0]))
      .y1(d => yScale(d.y))
      .curve(d3.curveCatmullRom.alpha(0.005))

    svg
      .append("path")
      .attr("d", area(data))
      .attr("class", "elevationChartLine")
      .style("stroke", "#787979")
      .style("stroke-opacity", 0.2)
      .style("stroke-width", 1)
      .style("fill", "#787979")
      .style("fill-opacity", 0.2)

    const crossBar = svg
      .append("g")
      .attr("class", "crossBar")
      .style("display", "none")

    crossBar
      .append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", height)
      .attr("y2", 0)

    crossBar
      .append("text")
      .attr("x", 10)
      .attr("y", 17.5)
      .attr("class", "crossBarText")

    const infoBox = svg
      .append("g")
      .attr("class", "infoBox")
      .style("display", "none")

    infoBox
      .append("rect")
      .attr("x", 0)
      .attr("y", 10)
      .style("height", 45)
      .style("width", 125)

    const infoBoxElevation = infoBox
      .append("text")
      .attr("x", 8)
      .attr("y", 30)
      .attr("class", "infoBoxElevation")

    infoBoxElevation
      .append("tspan")
      .attr("class", "infoBoxElevationTitle")
      .text("Elev: ")

    infoBoxElevation.append("tspan").attr("class", "infoBoxElevationValue")

    const infoBoxGrade = infoBox
      .append("text")
      .attr("x", 8)
      .attr("y", 44)
      .attr("class", "infoBoxGrade")

    infoBoxGrade
      .append("tspan")
      .attr("class", "infoBoxGradeTitle")
      .text("Grade: ")

    infoBoxGrade.append("tspan").attr("class", "infoBoxGradeValue")

    const mapId = this.props.mapRef.current.id

    const blip = d3
      .select(`#${mapId}`)
      .append("div")
      .attr("class", "customBlip")
      .style("margin-left", "-12.5px")
      .style("margin-top", "-12.5px")
      .style("position", "absolute")
      // z-index of 4 necessary so the Blip hides behind panels
      .style("z-index", 4)
      .style("width", "20px")
      .style("height", "20px")
      .style("background", "#2da5ca")
      .style("border", "2px solid white")
      .style("border-radius", "50%")
      .style("color", "black")
      .style("color", "black")
      .style("display", "none")

    // MOUSE IN / OUT EVENTS
    svg
      .append("rect")
      .attr("class", "chartOverlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() {
        crossBar.style("display", null)
        infoBox.style("display", null)
        blip.style("display", null)
      })
      .on("mouseout", function() {
        crossBar.style("display", "none")
        infoBox.style("display", "none")
        blip.style("display", "none")
      })
      .on("mousemove", mousemove)

    // NEEDS TO BE A FUNCTION EXPRESSION FOR ACCESS TO "THIS"!
    function mousemove() {
      const x0 = xScale.invert(d3.mouse(this)[0])
      const i = bisect(data, x0, 1)
      const d0 = data[i - 1]
      const d1 = data[i]
      const d = !d1 ? d0 : x0 - d0.x > d1.x - x0 ? d1 : d0
      crossBar.attr("transform", `translate(${xScale(d.x)}, 0)`)
      crossBar.select("text").text(d3.format(".1f")(metersToMiles(d.x)) + " mi")
      infoBox.attr("transform", `translate(${xScale(d.x) + 10}, 12.5)`)
      infoBox
        .select(".infoBoxElevationValue")
        .text(d3.format(",.0f")(metersToFeet(d.y)) + " ft")
      infoBox.select(".infoBoxGradeValue").text(d3.format(".1%")(d.grade))
      const { x: px, y: py } = fromLatLngToPoint(d.location, window.map)
      blip.style("transform", `translate3d(${px}px, ${py}px, 0px)`)
    }
  }

  render() {
    const { data, isHidden } = this.state
    const { toggle } = this.props
    return (
      <s.ElevationChartStyles isHidden={isHidden} toggle={toggle}>
        <div className="elevation-chart-wrapper">
          {isHidden && <ChartIcon height="32" width="32" />}
          <div className="chevron-wrapper" onClick={this.toggleChart}>
            <Chevron transform={isHidden ? "rotate(180deg)" : ""} />
          </div>
          {data.length > 0 && <div id="elevationChart" />}
        </div>
      </s.ElevationChartStyles>
    )
  }
}

ElevationChart.propTypes = {
  elevations: PropTypes.array.isRequired,
  distances: PropTypes.array.isRequired,
  mapRef: PropTypes.object.isRequired,
  toggle: PropTypes.bool.isRequired
}

export default ElevationChart
