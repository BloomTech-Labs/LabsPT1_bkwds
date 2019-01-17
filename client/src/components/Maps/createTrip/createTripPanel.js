import React, { Fragment } from "react"
import Axios from "axios"
import Styled from "styled-components"
import { toast } from "react-toastify"

import { SERVER_URI } from "../../../config"
import DeleteIcon from "../../icons/deleteSvg"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import "../createTrip/custom.css"
import { DateRangePicker } from "react-dates"
import { media } from "../../../styles/theme/mixins"

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

    ${media.tablet`
      max-width: 100%;
      width: 100%;
      height: ${props => (props.isToggled ? "50%" : "6%")};
      top: 0px;
      right: 0px;
      background: ${props =>
        props.isToggled ? "white" : "rgba(255, 255, 2555, 0.5)"};
      border-radius: 0;
      position: absolute;
      overflow-x: hidden;
      justify-content: ${props =>
        props.isToggled ? "space-evenly" : "center"};
      align-items: ${props => (props.isToggled ? "space-evenly" : "center")};
    `}

    #plus-icon{
      visibility: hidden;

      ${media.tablet`
        visibility: visible;
        position: absolute;
        right: 5%;
        bottom: 50%;
        color: rgba(108, 122, 137, .8)
      `}
    }
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

    ${media.tablet`
      display: ${props => (props.isToggled ? "flex" : "none")};
      position: static;
      justify-content: initial;
      overflow-x: hidden;
    `}

`
const SaveButton = Styled.button`
    color:white;
    width: 105px;
    border-radius:4px;
    background: #0e153f;

    ${media.tablet`
      display: ${props => (props.isToggled ? "flex" : "none")};
      position: static;
      bottom: auto;
      border: 1px solid black;
      margin: 0 auto;
    `}
`

const WaypointButton = Styled.button`
    color:white;
    background: #0e153f;
    border-radius: 4px;
    width:105px;

    ${media.tablet`display:none;`}

`
const PanelHeader = Styled.h2`
    font-size:1.5rem;
    padding:.5rem;

    ${media.tablet`display: none;`}
`
const DateLabel = Styled.label`
    margin:.5rem auto 0rem auto;
    color: #808080;

    ${media.tablet`
      display: none;
      overflow-x: hidden;
    `}


`
const WaypointList = Styled.div`

    ${media.tablet`
      display: none;
      overflow-x: hidden;
    `}
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

    ${media.tablet`
      display: ${props => (props.isToggled ? "flex" : "none")};
      text-align: center;
      margin: 0;
      border: 1px solid black;
      justify-self: center;
      align-self: center;
    `}

`
const InputLabel = Styled.label`
    width:85%;
    margin: 0 auto;
    color: #808080;

    ${media.tablet`display: none;`}
`

const WaypointLabel = Styled.label`
    margin:.25rem auto 1rem auto;
    color: #808080;

    ${media.tablet`display: none;`}

`
const WaypointInput = Styled.input`
    margin: 0 .5rem;
    border:0;
    outline:0;
    background:transparent;
    border-bottom: .15rem solid black;

    ${media.tablet`display: none;`}

`

const SearchCenterInput = Styled.input`
    margin: .25rem auto 1.25rem auto;
    width:85%;
    border:0;
    outline:0;
    background:transparent;
    border-bottom:.15rem solid black;

    ${media.tablet`
      text-align: center;
      margin: 0;
      border: 1px solid black;
      justify-self: center;
      align-self: center;

    `}

`

const DateRangeStyle = Styled.div`
  ${media.tablet`
    display: ${props => (props.isToggled ? "flex" : "none")};
    width: 85%;
    border: 1px solid black;
    justify-content: center;
    align-content: center;
    `}
`
// background: rgba(255, 255, 2555, 0.5);

const Toggle = Styled.div`
  display: flex;
  visibility: hidden;
  justify-content: center;

  ${media.tablet`
    visibility: visible;
  `}

`

class CreateTripPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: {},
      title: "",
      startDate: null,
      endDate: null,
      focusedInput: null,
      formError: null,
      location: "",
      isToggled: false
    }
  }

  toggleDropdown = () => {
    this.setState({ isToggled: !this.state.isToggled })
  }

  handleLocation = event => {
    this.setState({ location: event.target.value })
    this.searchAutoComplete()
    this.attachCenterListener()
  }

  searchAutoComplete = () => {
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
        window.map.panTo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        })
      }
    })
  }

  attachCenterListener = () => {
    window.map.addListener("center_changed", () => {
      const newCenter = window.map.getCenter()
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
      Axios.post(`${SERVER_URI}/trips/`, {
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
          toast(`Trip ${res.data.name} saved`)
        })
        .catch(err => console.log(err))
    }
  }

  handleTitle = e => {
    this.setState({ title: e.target.value }, () => {
      this.props.getTitle(e.target.value)
    })
  }

  // renderWaypointList = waypoints => {
  //   return waypoints.map((waypoint, i) => {
  //     return (
  //       <Waypoint key={i}>
  //         <label>{i + 1}</label>
  //         <WaypointInput
  //           type="text"
  //           placeholder="waypoint title"
  //           value={this.state.waypoints[i].name}
  //           onChange={e => {
  //             this.handleEdit(e, i)
  //           }}
  //         />
  //         <DeleteButton
  //           onClick={() => {
  //             this.handleDelete(i)
  //           }}
  //         >
  //           <DeleteIcon width="22px" height="22px" />
  //         </DeleteButton>
  //       </Waypoint>
  //     )
  //   })
  // }

  render() {
    return (
      <Fragment>
        <Panel isToggled={this.state.isToggled}>
          <PanelHeader>Create Your Trip</PanelHeader>
          <InputLabel>Location</InputLabel>
          <SearchCenterInput
            id="mapSearch"
            placeholder="Enter Location OR drag map"
            value={this.state.location}
            onChange={this.handleLocation}
          />

          <TripTitleInput
            isToggled={this.state.isToggled}
            placeholder="Trip Name"
            onChange={this.handleTitle}
            value={this.state.title}
          />

          <DateLabel>Trip Date</DateLabel>
          <DateRangeStyle isToggled={this.state.isToggled}>
            <DateRangePicker
              numberOfMonths={1}
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
          </DateRangeStyle>

          <WaypointLabel>Waypoints</WaypointLabel>
          {/* <WaypointList>
            {this.renderWaypointList(this.state.waypoints)}
          </WaypointList> */}

          <ButtonGroup isToggled={this.state.isToggled}>
            <WaypointButton onClick={this.props.addWaypoint}>
              + Waypoint
            </WaypointButton>
            <SaveButton
              isToggled={this.state.isToggled}
              onClick={() => this.handleSave()}
            >
              Create Trip
            </SaveButton>
          </ButtonGroup>
          <Toggle>
            <i
              id="down-angle"
              className="fas fa-angle-down fa-2x"
              onClick={this.toggleDropdown}
            />
          </Toggle>
        </Panel>
      </Fragment>
    )
  }
}

export default CreateTripPanel
