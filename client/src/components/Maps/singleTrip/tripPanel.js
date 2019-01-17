import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"

const Panel = Styled.div`
    max-width:360px;
    min-width:320px;
    border-radius: .5rem;
    display:flex;
    flex-direction:column;
    background:white;
    position:absolute;
    right:1.5rem;
    top:1.5rem;
    width:30%;
    height:45%;
    z-index:5;
`

const ButtonGroup = Styled.div`
    display:flex;
`

const StartTripButton = Styled.button`
    
`

const PanelHeader = Styled.h2`
    font-size:1.5rem;
    padding:1rem;
`

class TripPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trip: {},
      markers: []
    }
  }

  //passing props to state is anti-pattern - refactor with redux
  componentDidUpdate(prevProps) {
    if (this.props.map !== prevProps.map) {
      this.renderWaypoints(this.props.map, this.props.trip.waypoints)
    }
    if (this.props.trip !== prevProps.trip) {
      this.setState({ trip: this.props.trip })
    }
  }

  renderWaypoints = (map, waypoints) => {
    let markers = []
    console.log("rw called")
    waypoints.forEach(waypoint => {
      console.log("iterator called")
      const center = {
        lat: parseFloat(waypoint.lat.$numberDecimal),
        lng: parseFloat(waypoint.lon.$numberDecimal)
      }
      let marker = new window.google.maps.Marker({
        position: center,
        map: map,
        title: waypoint.name,
        label: `${waypoint.order}`
      })
      markers.push(marker)
    })
    this.setState({ markers })
  }

  render() {
    return (
      <Panel>
        <PanelHeader>{this.state.trip.name}</PanelHeader>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  return { tripId: state.trips.activeTrip }
}
export default connect(mapStateToProps)(TripPanel)
