import React, { Component } from "react"
import { uploadPics } from "../redux/actions/trips"

class UploadPics extends Component {
  state = {
    image: ""
  }

  upload(e) {
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

    // }
    this.uploadPics(image)
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

export default UploadPics
