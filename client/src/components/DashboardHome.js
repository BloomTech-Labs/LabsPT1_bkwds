import React from "react"
import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import PropTypes from "prop-types"

import * as s from "../styles/Dashboard.styles"
import { TripPropTypes } from "./propTypes"

const DashboardHome = ({ trips }) => {
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

DashboardHome.propTypes = {
  trips: PropTypes.arrayOf(TripPropTypes)
}

const mapStateToProps = state => ({
  trips: state.trips.trips
})

export default connect(mapStateToProps)(DashboardHome)
