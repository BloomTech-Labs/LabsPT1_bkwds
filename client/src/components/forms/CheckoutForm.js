import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { SERVER_URI } from "../../config"
import * as s from "../../styles/CheckoutForm.styles"
// import { checkout } from "../../redux/actions/auth"

import { CardElement, injectStripe } from "react-stripe-elements"
import { Input, Button } from "../../styles/theme/styledComponents"

class CheckoutForm extends Component {
  state = {
    name: "",
    billing_address_country: "",
    billing_address_zip: "",
    billing_address_state: "",
    billing_address_line1: "",
    billing_address_line2: "",
    billing_address_city: ""
  }

  submit = async () => {
    const {
      name,
      billing_address_line1,
      billing_address_line2,
      billing_address_city,
      billing_address_state,
      billing_address_zip,
      billing_address_country
    } = this.state
    const owner = {
      name,
      address: {
        line1: billing_address_line1,
        line2: billing_address_line2,
        city: billing_address_city,
        state: billing_address_state,
        postal_code: billing_address_zip,
        country: billing_address_country
      }
    }

    const { source } = await this.props.stripe.createSource({ type: "card" })
    const updatedSource = { ...source, owner }
    const subscription = await axios.post(
      `${SERVER_URI}/subscribe/paid/${this.props.user.id}`,
      {
        planId: this.props.planId,
        source: updatedSource
      }
    )
    if (subscription) {
      this.props.onCompleteSubscribe()
    } else {
      console.log(subscription.error)
    }
  }

  handleChangeCard = card => {
    this.setState({ card })
  }

  handleChangeOwnerInfo = e => {
    this.setState({ [e.target.id]: [e.target.value] })
  }

  render() {
    const {
      name,
      billing_address_line1,
      billing_address_line2,
      billing_address_city,
      billing_address_state,
      billing_address_zip,
      billing_address_country
    } = this.state
    return (
      <s.CheckoutFormStyles>
        <CardElement
          {...{ style: { base: { fontSize: "16px" } } }}
          onChange={this.handleChangeCard}
        />
        <Input
          id="name"
          type="text"
          placeholder="Name on card"
          value={name}
          onChange={this.handleChangeOwnerInfo}
        />
        <Input
          id="billing_address_line1"
          type="text"
          placeholder="Address Line 1"
          value={billing_address_line1}
          onChange={this.handleChangeOwnerInfo}
        />
        <Input
          id="billing_address_line2"
          type="text"
          placeholder="Address Line 2"
          value={billing_address_line2}
          onChange={this.handleChangeOwnerInfo}
        />
        <Input
          id="billing_address_city"
          type="text"
          placeholder="City"
          value={billing_address_city}
          onChange={this.handleChangeOwnerInfo}
        />
        <Input
          id="billing_address_state"
          type="text"
          placeholder="State"
          value={billing_address_state}
          onChange={this.handleChangeOwnerInfo}
        />
        <Input
          id="billing_address_zip"
          type="text"
          placeholder="Postal Code"
          value={billing_address_zip}
          onChange={this.handleChangeOwnerInfo}
        />
        <Input
          id="billing_address_country"
          type="text"
          placeholder="Country"
          value={billing_address_country}
          onChange={this.handleChangeOwnerInfo}
        />
        <Button onClick={this.submit}>Subsribe Now</Button>
      </s.CheckoutFormStyles>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { user: auth.user }
}

export default connect(
  mapStateToProps,
  null
)(injectStripe(CheckoutForm))
