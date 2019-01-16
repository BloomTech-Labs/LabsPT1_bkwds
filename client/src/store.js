import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import thunk from "redux-thunk"
import logger from "redux-logger"

import { authReducer } from "./redux/reducers/auth"
import { tripReducer } from "./redux/reducers/trips"
import { billingReducer } from "./redux/reducers/billing"
import { settingsReducer } from "./redux/reducers/settings"

export const history = createBrowserHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [thunk, logger, routerMiddleware(history)]

// TODO: put in redux/reducers/index.js & import instead
const createRootReducer = history =>
  combineReducers({
    auth: authReducer,
    trips: tripReducer,
    billing: billingReducer,
    settings: settingsReducer,
    router: connectRouter(history)
  })

export const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(...middleware))
)
