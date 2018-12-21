import React, { Component } from "react"
import styled, { keyframes, css } from "styled-components"

// seconds btwn animations / new tagline generation
const seconds = 9

const fadeInAndOut = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
`

const animationRule = css`
  ${fadeInAndOut} ${seconds}s infinite ease;
`

const BannerStyles = styled.div`
  .banner-rotating-tagline {
    animation: ${animationRule};
    animation-delay: 0s;
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
    // First get initial tagline:
    this.setState({ tagline: this.getTagline.next().value })

    // Then get a new tagline every n seconds:
    this.interval = setInterval(() => {
      this.setState({
        tagline: this.getTagline.next().value
      })
    }, `${seconds}000`)
  }

  componentWillUnmount() {
    // Stop getting taglines!
    clearInterval(this.interval)
  }

  render() {
    return (
      <BannerStyles>
        <div className="landing-page-banner">
          <span className="banner-title">
            <span className="banner-app-name">Backwoods Tracker</span>
            <span className="banner-rotating-tagline">
              {" ..."}
              {this.state.tagline.toLowerCase()}
            </span>
          </span>
        </div>
      </BannerStyles>
    )
  }
}

export default Banner
