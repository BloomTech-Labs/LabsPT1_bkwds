import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"

import requireAuth from "../components/hoc/RequireAuth"
import { getTrips } from "../redux/actions/trips"

import Dashboard from "../components/Dashboard"

class DashboardContainer extends Component {
  componentDidMount() {
    this.props.getTrips()
  }

  render() {
    const { trips } = this.props
    return trips ? <Dashboard trips={trips} /> : "Loading"
  }
}

const mapStateToProps = state => ({
  trips: state.trips.trips
})

const mapDispatchToProps = { getTrips }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(DashboardContainer)
