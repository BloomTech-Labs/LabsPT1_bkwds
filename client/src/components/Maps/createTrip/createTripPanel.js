import React from "react"
import { DateRangePicker } from "react-dates"
import PropTypes from "prop-types"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"

import * as s from "../../../styles/CreateTripPanel.styles"
import { Button } from "../../../styles/theme/styledComponents"
import Autocomplete from "../Autocomplete"

class CreateTripPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      startDate: null,
      endDate: null,
      focusedInput: null,
      location: "",
      searchToggled: false,
      menuToggled: false
    }
    this.inputRef = React.createRef()
  }

  toggleMenu = () => {
    this.setState({ menuToggled: !this.state.menuToggled })
  }

  toggleSearch = () => {
    this.setState({ searchToggled: !this.state.searchToggled })
  }

  handleLocation = event => {
    this.setState({ location: event.target.value })
    this.searchAutoComplete()
  }

  searchAutoComplete = () => {
    const autoComplete = new window.google.maps.places.Autocomplete(
      this.inputRef.current
    )
    autoComplete.addListener("place_changed", () => {
      let place = autoComplete.getPlace()
      if (place.geometry !== undefined) {
        window.map.panTo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        })
      }
    })
  }

  handleTitle = e => {
    e.persist()
    this.setState({ title: e.target.value }, () => {
      this.props.getTitle(e.target.value)
    })
  }

  handleDate = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate }, () => {
      this.props.getDates({ startDate, endDate })
    })
  }

  render() {
    return (
      <s.CreateTripPanelStyles
        menuToggled={this.state.menuToggled}
        searchToggled={this.state.searchToggled}
        className="CreateTripPanelStyles"
      >
        <div className="mobile-create-trip-panel">
          <button onClick={this.toggleSearch}>
            <i id="down-angle" className="fas fa-search fa-2x" />
          </button>

          <button onClick={this.toggleMenu}>
            <i id="" className="fas fa-cog fa-2x" />
          </button>

          <button onClick={this.props.saveTrip}>
            <i id="" className="fas fa-floppy-o fa-2x" />
          </button>
        </div>

        <Autocomplete
          google={window.google}
          inputRef={this.inputRef}
          map={null}
        >
          {({ location, viewport, formattedAddress }) => (
            <div className="desktop-create-trip-panel">
              <s.Panel menuToggled={this.state.menuToggled}>
                <s.PanelHeader className="hide-mobile">
                  Create Your Trip
                </s.PanelHeader>

                <s.SearchWrapper
                  searchToggled={this.state.searchToggled}
                  className="panel-input-wrapper"
                >
                  <s.InputLabel className="hide-mobile">Location</s.InputLabel>
                  <s.SearchCenterInput
                    ref={this.inputRef}
                    searchToggled={this.state.searchToggled}
                    placeholder="Enter Location OR drag map"
                    value={this.state.location}
                    onChange={this.handleLocation}
                  />
                </s.SearchWrapper>

                <div className="trip-title-wrapper panel-input-wrapper">
                  <s.TripTitleInput
                    menuToggled={this.state.menuToggled}
                    placeholder="Trip Name"
                    onChange={this.handleTitle}
                    value={this.state.title}
                  />
                </div>

                <s.DateLabel className="hide-mobile">Trip Date</s.DateLabel>
                <s.DateRangeStyle menuToggled={this.state.menuToggled}>
                  <DateRangePicker
                    numberOfMonths={1}
                    startDateId="startDate"
                    endDateId="endDate"
                    startDate={this.state.startDate}
                    horizontalMargin={5}
                    endDate={this.state.endDate}
                    onDatesChange={({ startDate, endDate }) => {
                      this.handleDate({ startDate, endDate })
                    }}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => {
                      this.setState({ focusedInput })
                    }}
                  />
                </s.DateRangeStyle>

                <s.ButtonGroup menuToggled={this.state.menuToggled}>
                  <s.WaypointButton
                    className="hide-mobile"
                    onClick={this.props.addWaypoint}
                  >
                    + Waypoint
                  </s.WaypointButton>
                  <Button
                    onClick={this.toggleMenu}
                    className="close-trip-settings btn-primary"
                  >
                    Close Trip Settings
                  </Button>
                  <s.SaveButton
                    menuToggled={this.state.menuToggled}
                    onClick={() => this.props.saveTrip()}
                  >
                    Create Trip
                  </s.SaveButton>
                </s.ButtonGroup>
              </s.Panel>
            </div>
          )}
        </Autocomplete>
      </s.CreateTripPanelStyles>
    )
  }
}

CreateTripPanel.propTypes = {
  addWaypoint: PropTypes.func.isRequired,
  deleteListener: PropTypes.func.isRequired,
  getDates: PropTypes.func.isRequired,
  getTitle: PropTypes.func.isRequired,
  saveTrip: PropTypes.func.isRequired
}

export default CreateTripPanel
