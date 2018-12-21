import React, { Component } from "react"
import styled, { keyframes } from "styled-components"

const fadeInAndOut = keyframes`
  0% {
    opacity: 0;
  }
  45% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`
const BannerStyles = styled.div`
  .banner-rotating-tagline {
    animation-name: ${fadeInAndOut};
    animation-duration: 3s;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    opacity: 1;
  }
`

function* makeTaglineIterator(taglinesArray) {
  let count = 0
  while (count < Infinity) {
    yield taglinesArray[count++ % taglinesArray.length]
  }
}

class Banner extends Component {
  state = {
    taglines: [
      "Built for adventures.",
      "The safest way to explore your world.",
      "Get outside and get out of your comfort zone."
    ],
    tagline: ""
  }

  interval = null
  getTagline = makeTaglineIterator(this.state.taglines)

  componentDidMount() {
    // get initial tagline
    this.setState({ tagline: this.getTagline.next().value })

    // get new tagline every 3 seconds
    this.interval = setInterval(() => {
      console.log("CALLING INTERVAL, STATE IS: ", this.state)
      this.setState({
        tagline: this.getTagline.next().value
      })
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <BannerStyles>
        <div className="landing-page-banner">
          <span className="banner-title">
            <span className="banner-app-name">Backwoods Tracker:</span>
            <span className="banner-rotating-tagline">
              {" "}
              {this.state.tagline}
            </span>
          </span>
        </div>
      </BannerStyles>
    )
  }
}

export default Banner
