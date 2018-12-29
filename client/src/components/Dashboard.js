import React from "react"
import { Link } from "react-router-dom"

import AppContainer from "./AppContainer"
import Trip from "./Trip"

import * as s from "../styles/Dashboard.styles"

const Dashboard = ({ trips }) => {
  return (
    <AppContainer>
      <s.DashboardStyles>
        <div>Dashboard</div>
        <div>
          {!trips && (
            <div>
              Add a trip
              <Link to="/trip/create">+</Link>
            </div>
          )}
          {trips && trips.map(trip => <Trip key={trip._id} trip={trip} />)}
        </div>
      </s.DashboardStyles>
    </AppContainer>
  )
}

export default Dashboard
