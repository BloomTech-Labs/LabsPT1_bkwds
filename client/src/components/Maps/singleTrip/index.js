import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import TripPanel from "../singleTrip/tripPanel"
import { SERVER_URI } from "../../../config"
import Axios from "axios"

const MapWrapper = Styled.div`
  position:relative;
  width:100%;
  height:100%;
`

class SingleTripMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      trip: {}
    }
  }

  componentDidMount() {
    this.fetchTrip(this.props.tripId).then(res => {
      this.setState({ trip: res }, () => {
        const center = { lat: this.state.trip.lat, lng: this.state.trip.lon }
        const map = this.renderMap(center, this.state.trip.waypoints)
        this.setState({ map })
      })
    })
  }

  async fetchTrip(tripId) {
    const res = await Axios.get(`${SERVER_URI}/trips/${tripId}`)
    const { data } = await res
    return data
  }
  //Attaches Map to div
  // TODO? Store users last zoom level for UX improvment - otherwise default to 9
  renderMap = center => {
    const map = new window.google.maps.Map(document.getElementById("Tripmap"), {
      center: center,
      zoom: 9,
      disableDefaultUI: true
    })
    return map
  }

  render() {
    return (
      <MapWrapper>
        <TripPanel map={this.state.map} trip={this.state.trip} />
        <div
          style={{ width: "100%", height: "100%", position: "absolute" }}
          id="Tripmap"
        />
      </MapWrapper>
    )
  }
}

const mapStateToProps = state => {
  return { tripId: state.trips.activeTrip }
}
export default connect(mapStateToProps)(SingleTripMap)
