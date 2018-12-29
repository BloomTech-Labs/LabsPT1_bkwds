import React, { Component } from "react"

import Banner from "../components/Banner"
import { makeTaglineIterator } from "../utils"

const seconds = 9

class BannerContainer extends Component {
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
    return (
      <Banner tagline={this.state.tagline.toLowerCase()} seconds={seconds} />
    )
  }
}

export default BannerContainer
