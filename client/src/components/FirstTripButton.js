import React, { Component } from "react"
import { Button } from "../styles/theme/styledComponents"
import * as s from "../styles/FirstTripStyles.styles"
import PropTypes from "prop-types"

class FirstTripButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  handleClick = () => e => {
    e.preventDefault()
    this.context.router.history.push(`/app/trip/create`)
  }

  render() {
    return (
      <s.FirstTripStyles>
        <a href="/" className="TripMsg">
          Add your first trip
        </a>
        <Button className="AddTripButton" onClick={this.handleClick()}>
          +
        </Button>
      </s.FirstTripStyles>
    )
  }
}

export default FirstTripButton
