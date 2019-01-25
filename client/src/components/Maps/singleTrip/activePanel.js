import React from "react"
import * as s from "./components"

class ActiveTripPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startPosition: {},
      currentPosition: {},
      endPosition: {}
    }
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          startPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    } else {
      console.log("Geolocation Not available")
    }
  }

  render() {
    return (
      <s.Panel>
        <s.PanelHeader>Active Trip Panel</s.PanelHeader>
        {this.state.startPosition.lat ? (
          <h2>{this.state.startPosition.lat}</h2>
        ) : (
          <h2>Position not available</h2>
        )}
      </s.Panel>
    )
  }
}

export default ActiveTripPanel
