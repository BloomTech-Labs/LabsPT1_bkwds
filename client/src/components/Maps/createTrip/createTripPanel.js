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
      query: "",
      searchToggled: false,
      menuToggled: false
    }
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.searchToggled && this.state.searchToggled)
      this.inputRef.current.focus()
  }

  toggleMenu = () => {
    this.setState({ menuToggled: !this.state.menuToggled })
  }

  toggleSearch = () => {
    this.setState({ searchToggled: !this.state.searchToggled })
  }

  handleSearch = event => {
    this.setState({ query: event.target.value })
    // this.searchAutoComplete()
  }

  // searchAutoComplete = () => {
  //   const autoComplete = new window.google.maps.places.Autocomplete(
  //     this.inputRef.current
  //   )
  //   autoComplete.addListener("place_changed", () => {
  //     let place = autoComplete.getPlace()
  //     if (place.geometry !== undefined) {
  //       window.map.panTo({
  //         lat: place.geometry.location.lat(),
  //         lng: place.geometry.location.lng()
  //       })
  //     }
  //   })
  // }

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
    const {
      menuToggled,
      searchToggled,
      title,
      startDate,
      endDate,
      focusedInput
    } = this.state
    return (
      <s.CreateTripPanelStyles
        menuToggled={menuToggled}
        searchToggled={searchToggled}
        className="CreateTripPanelStyles"
      >
        <div className="mobile-create-trip-panel">
          <Button
            onClick={this.toggleSearch}
            className={`btn-neutral ${searchToggled ? "active-button" : ""}`}
          >
            <i id="down-angle" className="fas fa-search" />
          </Button>

          <Button
            onClick={this.toggleMenu}
            className={`btn-neutral ${menuToggled ? "active-button" : ""}`}
          >
            <i id="" className="fas fa-cog" />
          </Button>

          <Button onClick={this.props.saveTrip} className={"btn-neutral"}>
            <i id="" className="fas fa-floppy-o" />
          </Button>
        </div>

        <Autocomplete
          google={window.google}
          inputRef={this.inputRef}
          map={null}
        >
          {({ location, viewport, formattedAddress }) => (
            <div className="desktop-create-trip-panel">
              <s.Panel menuToggled={menuToggled}>
                <s.PanelHeader className="hide-mobile">
                  Create Your Trip
                </s.PanelHeader>

                <s.SearchWrapper
                  searchToggled={searchToggled}
                  className="panel-input-wrapper"
                >
                  <s.InputLabel className="hide-mobile">
                    {formattedAddress ? formattedAddress : "Location"}
                  </s.InputLabel>
                  <s.SearchCenterInput
                    ref={this.inputRef}
                    searchToggled={searchToggled}
                    placeholder="Enter Location OR drag map"
                    value={this.state.query}
                    onChange={this.handleSearch}
                  />
                </s.SearchWrapper>

                <div className="trip-title-wrapper panel-input-wrapper">
                  <s.TripTitleInput
                    menuToggled={menuToggled}
                    placeholder="Trip Name"
                    onChange={this.handleTitle}
                    value={title}
                  />
                </div>

                <s.DateLabel className="hide-mobile">Trip Date</s.DateLabel>
                <s.DateRangeStyle menuToggled={menuToggled}>
                  <DateRangePicker
                    numberOfMonths={1}
                    startDateId="startDate"
                    endDateId="endDate"
                    startDate={startDate}
                    horizontalMargin={5}
                    endDate={endDate}
                    onDatesChange={({ startDate, endDate }) => {
                      this.handleDate({ startDate, endDate })
                    }}
                    focusedInput={focusedInput}
                    onFocusChange={focusedInput => {
                      this.setState({ focusedInput })
                    }}
                  />
                </s.DateRangeStyle>

                <s.ButtonGroup menuToggled={menuToggled}>
                  <s.WaypointButton
                    className="hide-mobile"
                    onClick={this.props.addWaypoint}
                  >
                    + Waypoint
                  </s.WaypointButton>
                  <Button
                    onClick={this.toggleMenu}
                    className="close-trip-settings btn-neutral"
                  >
                    Close Trip Settings
                  </Button>
                  <s.SaveButton
                    menuToggled={menuToggled}
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
