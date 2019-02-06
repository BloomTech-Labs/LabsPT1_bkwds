/* eslint react/display-name: 0 */
/* eslint react/prop-types: 0 */
import React from "react"
import { connect } from "react-redux"
import { Switch } from "react-router-dom"
import { MatchPropTypes } from "../propTypes"

import SingleTrip from "../Maps/singleTrip"
import AppContainer from "../AppContainer"
import NewTrip from "../NewTrip"
import Trips from "../Trips"
import Billing from "../Billing/"
import PaymentDetails from "../Billing/PaymentDetails"
import Plans from "../Billing/Plans"
import ArchivedTrips from "../ArchivedTrips"
import DashboardHome from "../DashboardHome"
import Settings from "../Settings"
import EditTrip from "../EditTrip"
import PublicTrips from "../PublicTrips"

import CustomRoute from "../../utils/CustomRoute"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardHome
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
    path: "/billing/payment",
    name: "Payment",
    component: PaymentDetails
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing
  },
  {
    path: "/upgrade",
    name: "Upgrade",
    component: Plans
  },
  {
    path: "/trips/explore",
    name: "PublicTrips",
    component: PublicTrips
  }
]

const Dashboard = ({ match }) => {
  const basePath = match.path
  return (
    <AppContainer>
      <Switch>
        {dashboardRoutes.map(({ path, ...rest }, idx) => (
          <CustomRoute
            protectedPath={true}
            path={basePath + path}
            {...rest}
            key={idx}
          />
        ))}
      </Switch>
    </AppContainer>
  )
}

Dashboard.propTypes = {
  match: MatchPropTypes
}

const mapStateToProps = ({ trips: { trips } }) => ({ trips })

export default connect(mapStateToProps)(Dashboard)
