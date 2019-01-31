import React, { Component } from "react"
import { uploadPics } from "../redux/actions/trips"
import { connect } from "react-redux"
import { TripPropTypes } from "./propTypes"
import PropTypes from "prop-types"
import styled from "styled-components"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

const ImageThumbnails = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto;
  width: 25%;
  img {
    width: 100%;
    height: 100%;
  }
`

class TripPictures extends Component {
  state = {
    tripPics: "",
    photoIndex: 0,
    isOpen: false
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
    const { photoIndex, isOpen } = this.state

    return (
      <div>
        {tripPics.map(picture => {
          return (
            <ImageThumbnails
              type="button"
              onClick={() => this.setState({ isOpen: true })}
            >
              <img key={picture} src={picture} />
            </ImageThumbnails>
          )
        })}
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
