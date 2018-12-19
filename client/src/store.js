import { createStore, applyMiddleware, combineReducers, compose } from "redux"
// import { routerReducer, routerMiddleware } from "react-router-redux"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import thunk from "redux-thunk"
import logger from "redux-logger"

import { tripsReducer } from "./redux/reducers/trips.js"
import { reducer as formReducer } from "redux-form"

export const history = createBrowserHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [logger, thunk, routerMiddleware(history)]

// TODO: put in index.js file in reducers??
const createRootReducer = history =>
  combineReducers({
    trips: tripsReducer,
    form: formReducer,
    router: connectRouter(history)
  })

export const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(...middleware))
)
