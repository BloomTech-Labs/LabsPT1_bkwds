import { Component } from "react"
import PropTypes from "prop-types"

class Autocomplete extends Component {
  state = {
    location: {
      lat: null,
      lng: null
    },
    viewport: null,
    formattedAddress: null
  }

  componentDidMount() {
    const { google, inputRef } = this.props
    this.autocomplete = new google.maps.places.Autocomplete(inputRef.current)
    this.autocomplete.setFields(["geometry", "formatted_address"])
    this.listener = this.autocomplete.addListener("place_changed", () => {
      const place = this.autocomplete.getPlace()
      if (!place.geometry) return
      if (!place.geometry.location) return
      const { lat, lng } = place.geometry.location

      console.log("LAT, LNG:", lat(), lng())
      console.log("VIEWPORT:", place.geometry.viewport)

      if (window.map && lat && lng) {
        window.map.setCenter({
          lat: lat(),
          lng: lng()
        })
      }

      this.setState({
        location: { lat: lat(), lng: lng() },
        viewport: place.geometry.viewport,
        formattedAddress: place.formatted_address
      })
    })
  }

  componentWillUnmount() {
    this.props.google.maps.event.clearInstanceListeners(this.listener)
  }

  render() {
    return this.props.children(this.state)
  }
}

Autocomplete.propTypes = {
  google: PropTypes.object.isRequired,
  inputRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLInputElement)
  }).isRequired,
  map: PropTypes.object,
  children: PropTypes.func.isRequired
}

export default Autocomplete
