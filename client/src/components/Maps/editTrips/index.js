import React from "react"

class React extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: { lat: -34.397, lng: 150.644 }
    }
  }
  componentDidMount() {
    const map = new window.google.maps.Map(
      document.getElementById("createTrip"),
      {
        center: this.state.center,
        zoom: 9,
        disableDefaultUI: true
      }
    )
  }

  render() {
    return (
      <div
        id="createTrip"
        style={{ width: "100vw - 165px", height: "100vh" }}
      />
    )
  }
}
