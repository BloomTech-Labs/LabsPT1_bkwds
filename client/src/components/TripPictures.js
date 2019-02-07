import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

import { Button } from "../styles/theme/styledComponents"
import Chevron from "./icons/ChevronSvg"
import * as s from "../styles/TripPicturesStyles"
import { uploadPics } from "../redux/actions/trips"
import { TripPropTypes } from "./propTypes"

class TripPictures extends Component {
  state = {
    photoIndex: 0,
    isOpen: false,
    theInputKey: "",
    isHidden: false
  }

  togglePictures = () => {
    const { isHidden } = this.state
    this.setState({
      isHidden: !isHidden
    })
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
    const { toggle, tripPics } = this.props
    const { photoIndex, isOpen, isHidden } = this.state

    return (
      <s.TripPicturesStyles isHidden={isHidden} toggle={toggle}>
        <div className="trip-pictures-wrapper">
          {isHidden && <i className="fa fa-picture-o" />}
          {/* <div className="chevron-wrapper" onClick={this.togglePictures}>
            <Chevron
              transform={isHidden ? "rotate(90deg)" : "rotate(270deg)"}
            />
          </div> */}

          <div className="trip-pictures">
            <div className="trip-pictures-header">
              <Button className="upload-button">
                <input
                  type="file"
                  onChange={this.upload}
                  accept="image/png, image/jpeg"
                />
                Upload New Pic
              </Button>
            </div>
            <div className="trip-picture-list">
              {tripPics.map((url, i) => (
                <s.ImageThumbnails key={i}>
                  <img
                    src={url}
                    onClick={() => this.setState({ isOpen: true })}
                  />
                </s.ImageThumbnails>
              ))}
            </div>
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
                  photoIndex:
                    (photoIndex + tripPics.length - 1) % tripPics.length
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
      </s.TripPicturesStyles>
    )
  }
}

TripPictures.propTypes = {
  trip: TripPropTypes,
  id: PropTypes.string.isRequired,
  toggle: PropTypes.bool.isRequired,
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
