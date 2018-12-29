import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { ThemeProvider } from "styled-components"

import "bootstrap/dist/css/bootstrap.min.css"
import * as serviceWorker from "./serviceWorker"

import Root from "./components/Root"
import { store } from "./store"
import { theme } from "./styles/theme/variables"
import { history } from "./store"

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Root />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
