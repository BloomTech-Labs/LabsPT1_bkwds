/* eslint react/display-name: 0 */

import React, { Component } from "react"
import { connect } from "react-redux"
import { Switch } from "react-router-dom"

import AppContainer from "../AppContainer"
import NewTrip from "../NewTrip"
import Trips from "../Trips"

import { getTrips } from "../../redux/actions/trips"
import CustomRoute from "../../utils/CustomRoute"

export const Billing = () => <div>Billing component here!</div>
export const Settings = () => <div>Settings component here!</div>
export const SingleTrip = ({ trip }) => (
  <div>Single Trip View component here! {trip.toString()}</div>
)

const dashboardRoutes = [
  {
    path: "/trip/create",
    name: "NewTrip",
    component: NewTrip
  },
  {
    path: "/trip/:tripId",
    name: "SingleTrip",
    render: ({ match }) => <SingleTrip trip={match.params.tripId} />
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
    return (
      <Switch>
        <AppContainer>
          {dashboardRoutes.map(({ path, ...rest }, idx) => (
            <>
              {console.log("RENDERING DASHBOARD ROUTE!")}
              {console.log("DASHBOARD ROUTE PATH:", path)}
              {console.log("DASHBOARD ROUTE REST:", rest)}
              <CustomRoute
                path={this.props.match.path + path}
                {...rest}
                key={idx}
              />
            </>
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
