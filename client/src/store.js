import { createStore, applyMiddleware, combineReducers } from "redux"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import logger from "redux-logger"

import { authReducer } from "./redux/reducers/auth"
import { tripReducer } from "./redux/reducers/trips"
import { billingReducer } from "./redux/reducers/billing"
import { modalReducer } from "./redux/reducers/modal"
import { settingsReducer } from "./redux/reducers/settings"
import { navigationReducer } from "./redux/reducers/navigation"

export const history = createBrowserHistory()

const composeEnhancers = composeWithDevTools({ trace: true })
const middleware = [thunk, logger, routerMiddleware(history)]

const createRootReducer = history =>
  combineReducers({
    auth: authReducer,
    trips: tripReducer,
    billing: billingReducer,
    modal: modalReducer,
    settings: settingsReducer,
    router: connectRouter(history),
    navigation: navigationReducer
  })

export const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(...middleware))
)
