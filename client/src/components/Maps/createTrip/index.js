import React from "react"
import Styled from "styled-components"

import CreateTripPanel from "./createTripPanel"

const MapWrapper = Styled.div`
  position:relative;
  width:100%;
  height:100%;
`

class CreateTripMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addingWaypoints: false,
      map: null
    }
  }
  componentDidMount() {
    var map = new window.google.maps.Map(
      document.getElementById("createTripMap"),
      {
        center: { lat: 39.0997, lng: -94.5786 },
        zoom: 9,
        disableDefaultUI: true
      }
    )
    this.setState({ map: map })
  }

  render() {
    return (
      <MapWrapper>
        <CreateTripPanel map={this.state.map} />
        <div
          id="createTripMap"
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
      </MapWrapper>
    )
  }
}

export default CreateTripMap
