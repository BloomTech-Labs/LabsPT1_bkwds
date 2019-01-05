import React, { Component } from "react"
import { connect } from "react-redux"
import { checkout } from "../../redux/actions/auth"

import { CardElement, injectStripe } from "react-stripe-elements"

class CheckoutForm extends Component {
  state = {
    complete: false
  }

  submit = async ev => {
    let { token } = await this.props.stripe.createToken({ name: "Name" })
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    })

    if (response.ok) this.setState({ complete: true })
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

const mapDispatchToProps = { checkout }

export default connect(
  null,
  mapDispatchToProps
)(injectStripe(CheckoutForm))
