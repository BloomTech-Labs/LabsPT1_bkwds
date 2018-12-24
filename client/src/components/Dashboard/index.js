import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { Link } from "react-router-dom"

import requireAuth from "../hoc/RequireAuth"
import { logout } from "../../redux/actions/auth"
import { getTrips } from "../../redux/actions/trips"
import * as s from "./styles"

class Dashboard extends Component {
  componentDidMount() {
    this.props.getTrips()
  }

  render() {
    // const { trips } = this.props
    return (
      <s.DashboardStyles>
        <div>DASHBOARD TITLE</div>
        <div>
          <div>
            Add a trip
            <Link to="/trip/create">+</Link>
          </div>
        </div>
      </s.DashboardStyles>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  pathname: state.router.location.pathname,
  trips: state.trips.trips
})

const mapDispatchToProps = { handleSignOut: logout, getTrips }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(Dashboard)
