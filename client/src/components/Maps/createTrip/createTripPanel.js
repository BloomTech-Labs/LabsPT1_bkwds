import React from "react"
import { DateRangePicker } from "react-dates"
import PropTypes from "prop-types"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"

import * as s from "../../../styles/CreateTripPanel.styles"
import { Button } from "../../../styles/theme/styledComponents"
import Autocomplete from "../Autocomplete"
import MobileMapPanel from "../../MobileMapPanel"

class CreateTripPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      startDate: null,
      endDate: null,
      focusedInput: null,
      query: "",
      numberOfWaypoints: 0
    }
    this.inputRef = React.createRef()
    this.focusedInputRef = React.createRef()
  }

  componentDidMount() {
    this.focusedInputRef.current.focus()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.searchToggled && this.state.searchToggled)
      this.focusedInputRef.current.focus()
  }

  toggleMenu = () => {
    this.setState({ menuToggled: !this.state.menuToggled })
  }

  toggleSearch = () => {
    this.setState({ searchToggled: !this.state.searchToggled })
  }

  handleSearch = event => {
    this.setState({ query: event.target.value })
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

  handleAddWaypoints = () => {
    this.setState(
      state => ({ numberOfWaypoints: ++state.numberOfWaypoints }),
      this.props.addWaypoint
    )
  }

  retrieveFormattedAddress = address => {
    this.setState({ query: address })
  }

  render() {
    const {
      menuToggled,
      searchToggled,
      title,
      startDate,
      endDate,
      focusedInput,
      numberOfWaypoints
    } = this.state
    return (
      <s.CreateTripPanelStyles
        menuToggled={menuToggled}
        searchToggled={searchToggled}
        className="CreateTripPanelStyles"
      >
        <MobileMapPanel>
          <div className="mobile-panel">
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
        </MobileMapPanel>

        <Autocomplete
          google={window.google}
          inputRef={this.inputRef}
          map={null}
          getFormattedAddress={this.retrieveFormattedAddress}
        >
          {() => (
            <div className="desktop-create-trip-panel">
              <s.Panel menuToggled={menuToggled}>
                <s.PanelHeader className="hide-mobile">
                  Create your trip
                </s.PanelHeader>
                <div className="trip-title-wrapper panel-input-wrapper">
                  <s.TripTitleInput
                    menuToggled={menuToggled}
                    placeholder="Trip Name"
                    onChange={this.handleTitle}
                    value={title}
                    ref={this.focusedInputRef}
                  />
                </div>
                <s.SearchWrapper
                  searchToggled={searchToggled}
                  className="panel-input-wrapper"
                >
                  <s.SearchCenterInput
                    ref={this.inputRef}
                    searchToggled={searchToggled}
                    placeholder="Location"
                    value={this.state.query}
                    onChange={this.handleSearch}
                  />
                </s.SearchWrapper>

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
                <s.WaypointAddAction>
                  <s.WaypointButton
                    className="hide-mobile"
                    onClick={this.handleAddWaypoints}
                  >
                    Add checkpoint
                  </s.WaypointButton>
                  <s.SaveButton
                    className={
                      title && startDate && endDate && numberOfWaypoints !== 0
                        ? ""
                        : "disabledButton"
                    }
                    menuToggled={menuToggled}
                    onClick={() =>
                      title &&
                      startDate &&
                      endDate &&
                      numberOfWaypoints !== 0 &&
                      this.props.saveTrip()
                    }
                  >
                    Create trip
                  </s.SaveButton>
                </s.WaypointAddAction>
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
