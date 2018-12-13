import React, { Component } from "react"
import "./App.css"
import "./index.css"
import Main from "./components/Navigation/Main"
import NavigationMenu from "./components/Navigation/NavigationMenu"

class App extends Component {
  render() {
    return (
      <div class="container">
        <div>
          <NavigationMenu />
        </div>
        <div>
          <Main />
        </div>
      </div>
    )
  }
}

export default App
