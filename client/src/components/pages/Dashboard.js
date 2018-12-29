/* eslint react/display-name: 0 */

import React, { Component } from "react"
import { connect } from "react-redux"
import { Switch } from "react-router-dom"

import AppContainer from "../AppContainer"
import NewTrip from "../NewTrip"
import Trips from "../Trips"
import DashboardHome from "../DashboardHome"
import SingleTrip from "../SingleTrip"

import { getTrips } from "../../redux/actions/trips"
import CustomRoute from "../../utils/CustomRoute"

export const Billing = () => <div>Billing component here!</div>
export const Settings = () => <div>Settings component here!</div>

const dashboardRoutes = [
  {
    path: "/",
    name: "Dashboard",
    component: DashboardHome,
    exact: true
  },
  {
    path: "/trip/create",
    name: "NewTrip",
    component: NewTrip
  },
  {
    path: "/trip/get/:tripId",
    name: "SingleTrip",
    render: ({ match }) => <SingleTrip tripId={match.params.tripId} />
  },
  {
    path: "/trips",
    name: "Trips",
    component: Trips
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing
  }
]

class Dashboard extends Component {
  componentDidMount() {
    this.props.getTrips()
  }

  render() {
    const basePath = this.props.match.path
    return (
      <Switch>
        <AppContainer>
          {dashboardRoutes.map(({ path, ...rest }, idx) => (
            <CustomRoute path={basePath + path} {...rest} key={idx} />
          ))}
        </AppContainer>
      </Switch>
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
)(Dashboard)
