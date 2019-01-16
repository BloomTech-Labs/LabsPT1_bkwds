import React from "react"
import { connect } from "react-redux"
import { SERVER_URI } from "../../../config"
import Axios from "axios"
import Styled from "styled-components"
import DeleteIcon from "../../icons/deleteSvg"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import "../createTrip/custom.css"
import { DateRangePicker } from "react-dates"
import { toast } from "react-toastify"

//TODO: Correctly handle POST trip/ call
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

const DeleteButton = Styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
`
const ButtonGroup = Styled.div`
    display:flex;
    justify-content:space-around;
    position:absolute;
    bottom:1rem;
    width:95%;
    margin: 0 auto;
`
const SaveButton = Styled.button`
    color:white;
    width: 105px;
    border-radius:4px;
    background: #0e153f;
`

const WaypointButton = Styled.button`
    color:white;
    background: #0e153f;
    border-radius: 4px;
    width:105px;

`
const PanelHeader = Styled.h2`
    font-size:1.5rem;
    padding:.5rem;
`
const DateLabel = Styled.label`
    margin:.5rem auto 0rem auto;
    color: #808080;

`
const WaypointList = Styled.div`
    overflow:scroll;
`

const Waypoint = Styled.div`
    align-items:center;
    width: 90%;
    display:flex;
    margin:0 auto;
`
const TripTitleInput = Styled.input`
    margin: .25rem auto 1.25rem auto;
    width:85%;
    border:0;
    outline:0;
    background:transparent;
    border-bottom: .15rem solid black;
`
const InputLabel = Styled.label`
    width:85%;
    margin: 0 auto;
    color: #808080;
`

const WaypointLabel = Styled.label`
    margin:.25rem auto 1rem auto;
    color: #808080;
`
const WaypointInput = Styled.input`
    margin: 0 .5rem;
    border:0;
    outline:0;
    background:transparent;
    border-bottom: .15rem solid black;
`

const SearchCenterInput = Styled.input`
    margin: .25rem auto 1.25rem auto;
    width:85%;
    border:0;
    outline:0;
    background:transparent;
    border-bottom:.15rem solid black;
`

class CreateTripPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: [],
      center: {},
      title: "",
      waypoints: [],
      startDate: null,
      endDate: null,
      focusedInput: null,
      formError: null
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.map !== prevProps.map) {
      this.searchAutoComplete(this.props.map)
      this.attachCenterListener(this.props.map)
    }
  }

  searchAutoComplete = map => {
    const input = document.getElementById("mapSearch")
    const autoComplete = new window.google.maps.places.Autocomplete(input)
    autoComplete.addListener("place_changed", () => {
      let place = autoComplete.getPlace()
      if (place.geometry !== undefined) {
        let center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
        this.setState({ center })
        map.panTo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        })
      }
    })
  }

  addWaypoint = map => {
    const index = this.state.waypoints.length
    const listener = map.addListener("click", e => {
      let marker = new window.google.maps.Marker({
        position: e.latLng,
        map: map,
        draggable: true,
        title: (index + 1).toString(),
        label: (index + 1).toString()
      })
      marker.addListener("dragend", ev => {
        const mappedWaypoints = this.state.waypoints.map((item, i) => {
          if (i !== index) {
            return item
          } else return { ...item, lat: ev.latLng.lat(), lon: ev.latLng.lng() }
        })
        this.setState({ waypoints: mappedWaypoints })
      })
      this.setState(prevState => ({
        waypoints: [
          ...prevState.waypoints,
          {
            userId: this.props.userId,
            lat: e.latLng.lat(),
            lon: e.latLng.lng(),
            tripId: this.props.tripId,
            order: index + 1,
            name: `Waypoint ${index + 1}`,
            start: new Date(),
            end: new Date()
          }
        ]
      }))
      this.setState(prevState => ({
        markers: [...prevState.markers, marker]
      }))

      window.google.maps.event.removeListener(listener)
    })
  }

  //filter waypoint and markers for i, then Re-Apply markers to maps
  updateOrder = waypoints => {
    return waypoints.map((item, i) => {
      return { ...item, order: i }
    })
  }

  handleDelete = i => {
    const temp = this.state.waypoints.filter((_, index) => {
      return i !== index
    })
    const reOrder = this.updateOrder(temp)
    this.setState({ waypoints: reOrder })
    this.deleteMapMarkers(i)
  }

  handleEdit = (e, i) => {
    const mapped = this.state.waypoints.map((item, index) => {
      if (index === i) {
        return { ...item, name: e.target.value }
      }
      return item
    })
    this.setState({ waypoints: mapped })
  }
  //map through and edit titles
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

  attachCenterListener = map => {
    map.addListener("center_changed", () => {
      const newCenter = map.getCenter()
      this.setState({ center: { lat: newCenter.lat(), lng: newCenter.lng() } })
    })
  }

  //Add toast to notify validation issues
  saveValidate = () => {
    const { startDate, endDate, title } = this.state
    if (startDate === null || endDate === null) {
      toast("Date not provided")
      return false
    }
    if (title === "") {
      toast("Title not provided")
      return false
    }
    return true
  }

  handleSave = () => {
    if (this.saveValidate()) {
      const trip = Axios.post(`${SERVER_URI}/trips/`, {
        userId: this.props.userId,
        lat: this.state.center.lat,
        isArchieved: false,
        lon: this.state.center.lng,
        waypoints: this.state.waypoints,
        start: this.state.startDate.utc().format(),
        end: this.state.endDate.utc().format(),
        name: this.state.title
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    }
  }

  setTitle = e => {
    this.setState({ title: e.target.value })
  }

  renderWaypointList = waypoints => {
    return waypoints.map((waypoint, i) => {
      return (
        <Waypoint key={i}>
          <label>{i + 1}</label>
          <WaypointInput
            type="text"
            placeholder="waypoint title"
            value={this.state.waypoints[i].name}
            onChange={e => {
              this.handleEdit(e, i)
            }}
          />
          <DeleteButton
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

  render() {
    return (
      <Panel>
        <PanelHeader>Create Your Trip</PanelHeader>
        <InputLabel>Trip Title</InputLabel>
        <TripTitleInput
          placeholder="Trip Name"
          onChange={this.setTitle}
          value={this.state.title}
        />
        <InputLabel>Location</InputLabel>
        <SearchCenterInput
          id="mapSearch"
          placeholder="Enter Location OR drag map"
        />

        <DateLabel>Trip Date</DateLabel>

        <DateRangePicker
          startDateId="startDate"
          endDateId="endDate"
          startDate={this.state.startDate}
          horizontalMargin={5}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) => {
            this.setState({ startDate, endDate })
          }}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => {
            this.setState({ focusedInput })
          }}
        />

        <WaypointLabel>Waypoints</WaypointLabel>
        <WaypointList>
          {this.renderWaypointList(this.state.waypoints)}
        </WaypointList>

        <ButtonGroup>
          <WaypointButton
            onClick={() => {
              this.addWaypoint(this.props.map)
            }}
          >
            + Waypoint
          </WaypointButton>
          <SaveButton onClick={() => this.handleSave()}>Save</SaveButton>
        </ButtonGroup>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  return { userId: state.auth.user.id }
}
export default connect(mapStateToProps)(CreateTripPanel)
