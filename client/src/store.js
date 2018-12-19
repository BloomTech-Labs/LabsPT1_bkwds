import { createStore, applyMiddleware, combineReducers, compose } from "redux"
// import { routerReducer, routerMiddleware } from "react-router-redux"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import thunk from "redux-thunk"
import logger from "redux-logger"
import { reducer as formReducer } from "redux-form"

import { authReducer } from "./redux/reducers/auth"
import { tripsReducer } from "./redux/reducers/trips"

export const history = createBrowserHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [logger, thunk, routerMiddleware(history)]

// TODO: put in redux/reducers/index.js and import here
const createRootReducer = history =>
  combineReducers({
    trips: tripsReducer,
    auth: authReducer,
    form: formReducer,
    router: connectRouter(history)
  })

export const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(...middleware))
)
