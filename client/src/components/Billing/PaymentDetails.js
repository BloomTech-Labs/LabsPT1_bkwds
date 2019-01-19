import React from "react"
import { Elements } from "react-stripe-elements"

import CheckoutForm from "../forms/CheckoutForm"
import StripeProvider from "./StripeProvider"

const PaymentDetails = () => (
  <>
    <h4>Payment Detail</h4>
    <div className="detail">
      <div>Total: $10/yearly</div>
      <div>Next billing date: 01/01/2020</div>
    </div>
    <StripeProvider>
      <Elements>
        <CheckoutForm />
      </Elements>
    </StripeProvider>
  </>
)

export default PaymentDetails
