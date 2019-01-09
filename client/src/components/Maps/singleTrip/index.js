import React from "react"

//TODO - fetch trip data and apply it to map.
export default class Map extends React.Component {
  state = {
    center: { lat: -34.397, lng: 150.644 }
  }

  // data is an array of markers
  renderMarkers = data => {}
  componentDidMount() {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: this.state.center,
      zoom: 9,
      disableDefaultUI: true
    })
  }
  render() {
    return <div style={{ width: "100vw - 165px", height: "100vh" }} id="map" />
  }
}
