import React, { Component } from "react"
import { uploadPics } from "../redux/actions/trips"
import { connect } from "react-redux"
import { TripPropTypes } from "./propTypes"

class UploadPics extends Component {
  state = {
    tripPics: ""
  }

  upload = e => {
    e.preventDefault()
    const image = e.target.files[0]
    console.log(e.target.files[0], "PICTURE")
    // if (e.target.files && e.target.files[0]) {
    //     let reader = new FileReader();
    //     reader.onload = (e) => {
    //         this.setState({ image: e.target.result });
    //         };
    //         reader.readAsDataURL(e.target.files[0])
    console.log(image, "IMAGE")
    console.log(this.props, "PROPS")

    // }
    this.props.uploadPics(image)
  }

  render() {
    return (
      <div>
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
  tripPics: state.trips.id,
  trip: state.trips.id
})

const mapDispatchToProps = { uploadPics }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPics)
