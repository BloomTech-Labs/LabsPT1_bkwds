import React, { Component } from "react"
import { Button } from "../styles/theme/styledComponents"
import * as s from "../styles/AddTripButton.styles"
import PropTypes from "prop-types"

class AddTripButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  handleClick = () => e => {
    e.preventDefault()
    this.context.router.history.push(`/app/trip/create`)
  }

  render() {
    return (
      <s.AddTripButtonStyles>
        <a href="/" className="TripMsg">
          Add trip
        </a>
        <Button className="AddTripButton" onClick={this.handleClick()}>
          +
        </Button>
      </s.AddTripButtonStyles>
    )
  }
}

export default AddTripButton
