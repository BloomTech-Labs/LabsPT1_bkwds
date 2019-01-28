import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Span = styled.span`
  @keyframes blink {
    to {
      opacity: 0;
    }
  }

  color: white;
  font-family: Courier, monospace;
  animation: blink 0.5s infinite;
`

class Typewriter extends PureComponent {
  static defaultProps = {
    delay: 550,
    erasingSpeed: 50,
    typingSpeed: 80
  }

  static propTypes = {
    delay: PropTypes.number,
    erasingSpeed: PropTypes.number,
    text: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
    typingSpeed: PropTypes.number
  }

  _timeout

  state = {
    displayText: "",
    index: 0
  }

  componentDidMount() {
    this.startTyping()
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout)
    }
  }

  getText = () =>
    typeof text === "string" ? [this.props.text] : [...this.props.text]

  erase = () => {
    let { displayText, index } = this.state
    const { erasingSpeed } = this.props

    if (displayText.length === 0) {
      const textArray = this.getText()

      index = index + 1 === textArray.length ? 0 : index + 1

      this.setState({ index }, () => this.startTyping())
    } else {
      displayText = displayText.substr(
        -displayText.length,
        displayText.length - 1
      )

      this.setState({ displayText }, () => {
        this.timeout = setTimeout(() => {
          this.erase()
        }, erasingSpeed)
      })
    }
  }

  type = () => {
    let { displayText } = this.state
    const { index } = this.state
    const { delay, typingSpeed } = this.props

    const text = this.getText()[index]

    if (text.length > displayText.length) {
      displayText = text.substr(0, displayText.length + 1)
      this.setState({ displayText }, () => {
        this._timeout = setTimeout(() => this.type(), typingSpeed)
      })
    } else {
      this._timeout = setTimeout(() => this.erase(), delay)
    }
  }

  startTyping = () => (this._timeout = setTimeout(() => this.type(), 550))

  render() {
    return (
      <h1>
        {this.state.displayText}
        <Span>|</Span>
      </h1>
    )
  }
}

export default Typewriter
