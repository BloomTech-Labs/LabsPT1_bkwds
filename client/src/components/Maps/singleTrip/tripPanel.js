import React from "react"
import { DateRangePicker } from "react-dates"
import Styled from "styled-components"
import EditIcon from "../../icons/EditSvg"
import DeleteIcon from "../../icons/DeleteSvg"
import SaveIcon from "../../icons/SaveSvg"
import AddIcon from "../../icons/AddSvg"
import { connect } from "react-redux"
import { Z_BLOCK } from "zlib"
// import { WaypointLabel } from "../../../styles/CreateTripPanel.styles";

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

const WaypointLabel = Styled.label`
  margin: 0 1rem;
`

const PanelHeader = Styled.div`
    padding:1.1rem;
    align-items:center;
    justify-content:space-between;
    display:flex;
 
`
const Waypoint = Styled.div`
    align-items:center;
    width: 90%;
    display:flex;
    margin: .5rem auto;
`
const WaypointInput = Styled.input`
    box-sizing:border-box;
    border:0;
    outline:0;
    background:transparent;
    border-bottom: ${props =>
      props.edit ? ".15rem solid black" : ".15rem solid transparent"};
`
const TripTitleInput = Styled.input`
    box-sizing:border-box;
    font-size: 1.5rem;
    width:75%;
    border:0;
    outline:0;
    background:transparent;
    border-bottom: .15rem solid black;
    border-bottom: ${props =>
      props.edit ? ".15rem solid black" : ".15rem solid transparent"};
`
const EditButton = Styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
`
const DeleteButton = Styled.button`
      visibility: ${props => (!props.edit ? "hidden" : "visible")};
      background: none;
      color: inherit;
      border: none;
    
`

const WaypointList = Styled.div`
    overflow:scroll;
`
const WaypointsHeader = Styled.div`
  margin: 0 1rem 1rem 1rem;
  align-items:center;
  color:#808080;
  display:flex;
  width:50%;
  justify-content:space-between;
    & h4 {
    font-size:1.25rem;
    margin: 0;
   }
   & button {
     margin-left: 1rem;
   }
  
`

const SaveButton = Styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
`
const AddButton = Styled.button`
   visibility: ${props => (!props.edit ? "hidden" : "visible")};
   border:0;
   background:transparent;
`
const StartButton = Styled.button`
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.15);
  background:#45569e;
   position:absolute;
   bottom:1.5rem;
   right:1.5rem;
   color:white;
   width:100px;
   border-radius:5px;
`

class TripPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      saveToggle: false,
      trip: {},
      markers: []
    }
  }

  //passing props to state? refactor to redux
  componentDidUpdate(prevProps) {
    if (this.props.trip !== prevProps.trip) {
      this.setState({ trip: this.props.trip }, () => {
        this.renderWaypoints()
      })
    }
  }

  renderWaypoints = () => {
    let markers = []
    this.state.trip.waypoints.forEach(waypoint => {
      const center = {
        lat: parseFloat(waypoint.lat.$numberDecimal),
        lng: parseFloat(waypoint.lon.$numberDecimal)
      }
      let marker = new window.google.maps.Marker({
        position: center,
        map: window.map,
        title: waypoint.name,
        label: `${waypoint.order}`,
        draggable: false
      })

      markers.push(marker)
    })
    this.setState({ markers })
  }

  handleEditToggle = () => {
    this.setState({ isEditing: true, saveToggle: true }, () => {
      this.toggleDraggable()
    })
  }
  handleTitle = e => {
    this.setState({ trip: { ...this.state.trip, name: e.target.value } })
  }

  renderWaypointList = waypoints => {
    if (waypoints) {
      return waypoints.map((_, i) => {
        return (
          <Waypoint key={i}>
            <WaypointLabel>{i + 1}</WaypointLabel>
            <WaypointInput
              type="text"
              disabled={this.state.isEditing === false}
              edit={this.state.isEditing}
              placeholder="waypoint title"
              value={this.state.trip.waypoints[i].name}
              onChange={e => {
                this.handleEdit(e, i)
              }}
            />

            <DeleteButton
              disabled={this.state.isEditing === false}
              edit={this.state.isEditing}
              onClick={() => {
                this.handleDelete(i)
              }}
            >
              <DeleteIcon width="22px" height="22px" />
            </DeleteButton>
          </Waypoint>
        )
      })
    }
  }

  handleDelete = i => {
    const temp = this.state.trip.waypoints.filter((_, index) => {
      return i !== index
    })
    const reOrder = this.updateOrder(temp)
    this.setState({ trip: { ...this.state.trip, waypoints: reOrder } })
    this.deleteMapMarkers(i)
  }

  updateOrder = waypoints => {
    return waypoints.map((item, i) => {
      return { ...item, order: i }
    })
  }

  toggleDraggable = () => {
    console.log(this.state.isEditing)
    this.state.markers.forEach(marker => {
      marker.setDraggable(this.state.isEditing)
    })
  }

  handleEdit = (e, i) => {
    const mapped = this.state.trip.waypoints.map((item, index) => {
      if (index === i) {
        return { ...item, name: e.target.value }
      }
      return item
    })
    this.setState({ trip: { ...this.state.trip, waypoints: mapped } })
  }

  deleteMapMarkers = i => {
    this.state.markers.forEach((item, index) => {
      if (i === index && item) {
        item.setMap(null)
      }
    })
    let updatedMarkers = this.state.markers.filter((_, index) => {
      return i !== index
    })
    updatedMarkers.forEach((item, index) => {
      item.setLabel(`${index + 1}`)
    })

    this.setState({ markers: updatedMarkers })
  }

  handleSave = () => {
    this.setState({ saveToggle: false, isEditing: false }, () => {
      this.toggleDraggable()
    })
  }

  render() {
    return (
      <Panel>
        <PanelHeader>
          <TripTitleInput
            type="text"
            edit={this.state.isEditing}
            value={this.state.trip.name}
            onChange={this.handleTitle}
            disabled={this.state.isEditing === false}
          />
          {!this.state.saveToggle ? (
            <EditButton
              onClick={() => {
                this.handleEditToggle()
              }}
            >
              <EditIcon width="20px" height="20px" />
            </EditButton>
          ) : (
            <SaveButton
              onClick={() => {
                this.handleSave()
              }}
            >
              <SaveIcon width="20px" height="20px" />
            </SaveButton>
          )}
        </PanelHeader>
        <WaypointsHeader>
          <h4>Waypoints</h4>
          <AddButton
            disabled={this.state.isEditing === false}
            edit={this.state.isEditing}
          >
            <AddIcon height="18px" width="18px" />
          </AddButton>
        </WaypointsHeader>
        <WaypointList>
          {this.renderWaypointList(this.state.trip.waypoints)}
        </WaypointList>
        <StartButton>Start Trip</StartButton>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  return { tripId: state.trips.activeTrip }
}
export default connect(mapStateToProps)(TripPanel)
