import React, { Component } from "react"
import { connect } from "react-redux"
import * as s from "../../styles/CheckoutForm.styles"
import { subscribe } from "../../redux/actions/billing"

import { CardElement, injectStripe } from "react-stripe-elements"
import { Input, Button } from "../../styles/theme/styledComponents"

class CheckoutForm extends Component {
  state = {
    name: "",
    country: "",
    postal_code: "",
    state: "",
    line1: "",
    line2: "",
    city: ""
  }

  submit = async () => {
    const { name, line1, line2, city, state, postal_code, country } = this.state
    const owner = {
      name,
      address: {
        line1,
        line2,
        city,
        state,
        postal_code,
        country
      }
    }
    this.props.subscribe({
      id: this.props.user.id,
      owner,
      stripe: this.props.stripe
    })
  }

  handleChangeCard = card => {
    this.setState({ card })
  }

  handleChangeOwnerInfo = e => {
    this.setState({ [e.target.id]: [e.target.value] })
  }

  render() {
    const { name, line1, line2, city, state, postal_code, country } = this.state
    return (
      <s.CheckoutFormStyles>
        <div>
          <CardElement
            onChange={this.handleChangeCard}
            onReady={el => el.focus()}
          />
          <Input
            id="name"
            type="text"
            placeholder="Name on card"
            value={name}
            onChange={this.handleChangeOwnerInfo}
          />
          <Input
            id="line1"
            type="text"
            placeholder="Address Line 1"
            value={line1}
            onChange={this.handleChangeOwnerInfo}
          />
          <Input
            id="line2"
            type="text"
            placeholder="Address Line 2"
            value={line2}
            onChange={this.handleChangeOwnerInfo}
          />
          <Input
            id="city"
            type="text"
            placeholder="City"
            value={city}
            onChange={this.handleChangeOwnerInfo}
          />
          <Input
            id="state"
            type="text"
            placeholder="State"
            value={state}
            onChange={this.handleChangeOwnerInfo}
          />
          <Input
            id="postal_code"
            type="number"
            placeholder="Postal Code"
            value={postal_code}
            onChange={this.handleChangeOwnerInfo}
          />
          <Input
            id="country"
            type="text"
            placeholder="Country"
            value={country}
            onChange={this.handleChangeOwnerInfo}
          />
          <Button onClick={this.submit}>Subscribe Now</Button>
        </div>
      </s.CheckoutFormStyles>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user }
}

const mapDispatchToProps = {
  subscribe
}

// We have to wrap connect in `injectStripe` to avoid bugs where shouldComponentUpdate
// interferes with connect's own shouldComponent update.
// See https://github.com/stripe/react-stripe-elements#troubleshooting
export default injectStripe(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckoutForm)
)
