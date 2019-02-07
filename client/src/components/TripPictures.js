import React, { Component } from "react"
import { uploadPics } from "../redux/actions/trips"
import { connect } from "react-redux"
import { TripPropTypes } from "./propTypes"
import PropTypes from "prop-types"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"
import { Button } from "../styles/theme/styledComponents"

class TripPictures extends Component {
  state = {
    tripPics: [],
    photoIndex: 0,
    isOpen: false,
    theInputKey: ""
  }

  upload = e => {
    e.preventDefault()
    const { id } = this.props

    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader()
      reader.onloadend = () => {
        this.props.uploadPics(id, reader.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
    e.target.value = null
  }

  render() {
    let hack = {
      opacity: 0
    }

    const { tripPics } = this.props
    const { photoIndex, isOpen } = this.state

    return (
      <div>
        <div>
          <h4>Upload Your Pics:</h4>
          <Button>
            <input
              style={hack}
              type="file"
              onChange={e => this.upload(e)}
              accept="image/png, image/jpeg"
            />
            Upload Pics
          </Button>
          <Button type="button" onClick={() => this.setState({ isOpen: true })}>
            View Trip Pics
          </Button>
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={tripPics[photoIndex]}
            nextSrc={tripPics[(photoIndex + 1) % tripPics.length]}
            prevSrc={
              tripPics[(photoIndex + tripPics.length - 1) % tripPics.length]
            }
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + tripPics.length - 1) % tripPics.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % tripPics.length
              })
            }
          />
        )}
      </div>
    )
  }
}

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
