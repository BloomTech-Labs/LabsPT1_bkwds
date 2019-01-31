import React, { Component } from "react"
import { uploadPics } from "../redux/actions/trips"
import { connect } from "react-redux"
import { TripPropTypes } from "./propTypes"
import PropTypes from "prop-types"

class TripPictures extends Component {
  state = {
    tripPics: ""
  }

  upload = e => {
    const { id } = this.props

    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader()
      reader.onloadend = () => {
        this.props.uploadPics(id, reader.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  render() {
    const { tripPics } = this.props
    return (
      <div>
        {tripPics.map(picture => {
          return <img key={picture} src={picture} />
        })}
        <h4>
          Upload Your Pics:
          {/* <form >     */}
          <input
            type="file"
            onChange={this.upload}
            accept="image/png, image/jpeg"
          />
          {/* <button type="submit" onSubmit={this.upload}>Upload</button> */}
          {/* </form> */}
        </h4>
      </div>
    )
  }
}
console.log(TripPropTypes, "PROPTYESVJ")

//I have no clue what this does -VM//
TripPictures.propTypes = {
  trip: TripPropTypes,
  id: PropTypes.string.isRequired,
  tripPics: PropTypes.arrayOf(PropTypes.string),
  uploadPics: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tripPics: state.trips.activeTrip.tripPics,
  id: state.trips.activeTrip.id
})

const mapDispatchToProps = { uploadPics }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPictures)
