import React from "react"

class CreateTrip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: { lat: -34.397, lng: 150.644 },
      markers: [{ lat: -35.102, lng: 150.123 }]
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
    new window.google.maps.Marker({
      position: this.state.markers[0],
      map: map,
      title: "Placeholder marker"
    })
  }

  render() {
    return (
      <div
        id="createTrip"
        style={{ width: "100%", height: "100%", position: "absolute" }}
      >
        {/* <div style = {{zIndex:400, position:'absolute',top:'20px'}}>
          {this.props.children}
        </div> */}
      </div>
    )
  }
}

export default CreateTrip
