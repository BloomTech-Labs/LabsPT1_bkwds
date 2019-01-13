/* eslint react/display-name: 0 */

import React from "react"
import { connect } from "react-redux"
import { Switch } from "react-router-dom"

import AppContainer from "../AppContainer"
import NewTrip from "../NewTrip"
import Trips from "../Trips"
import Billing from "../Billing"
import ArchivedTrips from "../ArchivedTrips"
import DashboardHome from "../DashboardHome"
import SingleTrip from "../SingleTrip"
import EditTrip from "../EditTrip"

import CustomRoute from "../../utils/CustomRoute"

export const Settings = () => <div>Settings component here!</div>

const dashboardRoutes = [
  {
    path: "/",
    name: "Dashboard",
    component: ({ trips }) => <DashboardHome trips={trips} />,
    exact: true
  },
  {
    path: "/trip/create",
    name: "NewTrip",
    component: NewTrip
  },
  {
    path: "/trip/edit",
    name: "EditTrip",
    component: EditTrip
  },
  {
    path: "/trip/:tripId",
    name: "SingleTrip",
    component: ({ match }) => <SingleTrip tripId={match.params.tripId} />
  },
  {
    path: "/trips",
    name: "Trips",
    component: Trips,
    exact: true
  },
  {
    path: "/trips/archived",
    name: "ArchivedTrips",
    component: ArchivedTrips
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

const Dashboard = ({ match }) => {
  const basePath = match.path
  return (
    <Switch>
      <AppContainer>
        {dashboardRoutes.map(({ path, ...rest }, idx) => (
          <CustomRoute
            protectedPath={true}
            path={basePath + path}
            {...rest}
            key={idx}
          />
        ))}
      </AppContainer>
    </Switch>
  )
}

const mapStateToProps = state => ({
  trips: state.trips.trips
})

export default connect(mapStateToProps)(Dashboard)
