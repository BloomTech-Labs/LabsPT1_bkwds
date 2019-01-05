import React from "react"
import * as s from "../styles/Checkout.styles"

import { Elements, StripeProvider } from "react-stripe-elements"
import CheckoutForm from "./forms/CheckoutForm"

const Checkout = () => {
  return (
    <StripeProvider apiKey="pk_test_12RJOzHXwYtqfRwncplH3B6V">
      <s.CheckoutStyles>
        <h3>Checkout</h3>
        <Elements>
          <CheckoutForm />
        </Elements>
      </s.CheckoutStyles>
    </StripeProvider>
  )
}

export default Checkout
