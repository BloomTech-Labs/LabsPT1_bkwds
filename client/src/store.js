import { createStore, applyMiddleware, combineReducers } from "redux"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import logger from "redux-logger"

import { authReducer } from "./redux/reducers/auth"
import { tripReducer } from "./redux/reducers/trips"
import { billingReducer } from "./redux/reducers/billing"
import { settingsReducer } from "./redux/reducers/settings"
import { navigationReducer } from "./redux/reducers/navigation"
import { waypointsReducer } from "./redux/reducers/waypoints"

export const history = createBrowserHistory()

const composeEnhancers = composeWithDevTools({ trace: true })
const middleware = [thunk, logger, routerMiddleware(history)]

// TODO: put in redux/reducers/index.js & import instead
const createRootReducer = history =>
  combineReducers({
    auth: authReducer,
    trips: tripReducer,
    billing: billingReducer,
    settings: settingsReducer,
    navigation: navigationReducer,
    waypoints: waypointsReducer,
    router: connectRouter(history)
  })

export const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(...middleware))
)
