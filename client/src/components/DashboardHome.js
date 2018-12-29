import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"

import { getTrips } from "../redux/actions/trips"
import * as s from "../styles/Dashboard.styles"

class DashboardHome extends Component {
  componentDidMount() {
    this.props.getTrips()
  }

  render() {
    const { trips } = this.props
    return (
      <s.DashboardStyles>
        <div>Dashboard Home</div>
        <div>
          {!trips && (
            <div>
              Add a trip
              <Link to="/trip/create">+</Link>
            </div>
          )}
          {trips && <Redirect to="/app/trips" />}
        </div>
      </s.DashboardStyles>
    )
  }
}

const mapStateToProps = state => ({
  trips: state.trips.trips
})

const mapDispatchToProps = { getTrips }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardHome)
