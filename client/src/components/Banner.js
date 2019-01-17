import React, { Component } from "react"

import * as s from "../styles/Banner.styles"
import { makeTaglineIterator } from "../utils"

class Banner extends Component {
  state = {
    taglines: [
      "Built for adventures.",
      "The safest way to explore your world.",
      "Get outside and get out of your comfort zone."
    ],
    tagline: ""
  }

  taglineGenerator = makeTaglineIterator(this.state.taglines)
  interval = null

  componentDidMount() {
    const { seconds } = this.props
    this.setState({ tagline: this.taglineGenerator.next().value })

    // Then get a new tagline every n seconds:
    this.interval = setInterval(() => {
      this.setState({
        tagline: this.taglineGenerator.next().value
      })
    }, `${seconds}000`)
  }

  componentWillUnmount() {
    // Stop getting taglines!
    clearInterval(this.interval)
  }

  render() {
    const { seconds } = this.props || 9
    const { tagline } = this.state
    return (
      <s.Banner seconds={seconds}>
        <div className="landing-page-banner">
          <span className="banner-title">
            <span className="banner-app-name">bkwds.</span>
            <span className="banner-rotating-tagline">
              {" ... "}
              {tagline.toLowerCase()}
            </span>
          </span>
        </div>
      </s.Banner>
    )
  }
}

export default Banner
