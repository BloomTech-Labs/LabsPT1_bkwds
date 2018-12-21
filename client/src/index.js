import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { ThemeProvider } from "styled-components"

import "bootstrap/dist/css/bootstrap.min.css"
import * as serviceWorker from "./serviceWorker"

import App from "./components/App"
import { store } from "./store"
import { theme } from "./theme/variables"
import { history } from "./store"

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
