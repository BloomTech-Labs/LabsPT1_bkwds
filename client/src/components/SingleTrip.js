import React, { Component } from "react"
import { connect } from "react-redux"
import Trip from "../components/Maps/singleTrip"
// import { Link } from "react-router-dom"

// import Trip from "./Trip"
import { getSingleTrip } from "../redux/actions/trips"
import { getTripById } from "../utils/selectors"

class SingleTrip extends Component {
  componentDidMount() {
    this.props.getSingleTrip(this.props.tripId)
  }

  render() {
    // const { trip, tripId } = this.props
    return <Trip />
  }
}

const mapStateToProps = (state, ownProps) => ({
  trip: getTripById(state, ownProps.tripId)
})

const mapDispatchToProps = { getSingleTrip }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTrip)
