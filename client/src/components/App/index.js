import React from "react"
import { Route } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"
import { history } from "../../store"

import { LayoutWrapper } from "../Wrapper"

import AppRouter from "../Router"

const App = props => (
  <ConnectedRouter history={history}>
    <div>hi connected</div>
  </ConnectedRouter>
)

export const Home = () => <div>Home component here!</div>
export const TripsView = () => <div>Trips View component here!</div>
export const TripView = () => <div>Single Trip View component here!</div>
export const Progress = () => <div>Track and view trip progress here!</div>
export const TripCreate = () => <div>Create New Trip here!</div>
export const Billing = () => <div>Billing component here!</div>
export const Settings = () => <div>Settings component here!</div>
export default App
