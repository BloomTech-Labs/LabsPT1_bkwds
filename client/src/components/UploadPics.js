import React, { Component } from "react"
import { uploadPics, renderPics } from "../redux/actions/trips"
import { connect } from "react-redux"
import { TripPropTypes } from "./propTypes"

class UploadPics extends Component {
  state = {
    tripPics: ""
  }

  componentDidMount() {
    console.log(this.props, "STETEAAAAA")
    console.log(this.props.tripPics, "STETE")
    this.renderPics(this.props.id)
  }

  // componentDidUpdate(_, prevState) {
  //   if (prevState.markers !== this.state.markers) {
  //     // this.getPathElevation()
  //     this.props.getTrips(this.props.userId)

  //     this.pics()
  //   }
  // }

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
    const { pictures } = this.props
    console.log(pictures, "PICTURES")
    return (
      <div>
        {pictures.map(picture => {
          return <img key={picture} />
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

UploadPics.propTypes = {
  trip: TripPropTypes
}

const mapStateToProps = state => ({
  tripPics: state.trips.activeTrip.tripPics,
  id: state.trips.activeTrip.id
})

const mapDispatchToProps = { uploadPics, renderPics }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPics)
