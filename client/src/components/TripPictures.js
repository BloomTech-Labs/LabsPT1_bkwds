import React, { Component } from "react"
import { uploadPics } from "../redux/actions/trips"
import { connect } from "react-redux"
import { TripPropTypes } from "./propTypes"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"
import { Button } from "../styles/theme/styledComponents"
import Chevron from "./icons/ChevronSvg"
import { media } from "../styles/theme/mixins"

const TripPicturesStyles = styled.div`
  visibility: visible;
  ${media.tablet`
    visibility: ${props => (props.toggle ? "visible" : "hidden")};
  `}

  position: absolute;
  top: unset;
  bottom: 50px;
  z-index: 5;
  left: 125px;
  background: white;
  span.chevron-icon {
    position: absolute;
    top: 0.125rem;
    right: 1.25rem;
    height: 1.5rem;
    width: 1.5rem;
    ${media.tablet`
      visibility: hidden;
    `}
  }
  .trip-pictures-wrapper {
    height: 187px;
  }
  .chevron-wrapper {
    cursor: pointer;
    width: 50px;
  }

  ${props => props.isHidden && isHiddenStyles}
`

const isHiddenStyles = css`
  .trip-pictures-wrapper {
    height: 50px;
    padding: 12px 12px 8px 12px;
    width: 90px;
    span.chevron-icon {
      top: 0.35rem;
      right: 0.5rem;
      height: 2.25rem;
      width: 2.25rem;
    }
  }

  i {
    font-size: 1.75rem;
  }

  .trip-pictures {
    padding-top: 10px;
  }
`

const ImageThumbnails = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  width: 15%;
  img {
    width: 100%;
    height: 100%;
  }
`

class TripPictures extends Component {
  state = {
    tripPics: [],
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
    let hack = {
      opacity: 0
    }

    const { toggle, tripPics } = this.props
    const { photoIndex, isOpen, isHidden } = this.state

    return (
      <TripPicturesStyles isHidden={isHidden} toggle={toggle}>
        <div className="trip-pictures-wrapper">
          {isHidden && <i className="fa fa-picture-o" />}
          <div className="chevron-wrapper" onClick={this.togglePictures}>
            <Chevron transform={isHidden ? "rotate(180deg)" : ""} />
          </div>
          <div className="trip-pictures">
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
            <Button
              type="button"
              onClick={() => this.setState({ isOpen: true })}
            >
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
      </TripPicturesStyles>
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
