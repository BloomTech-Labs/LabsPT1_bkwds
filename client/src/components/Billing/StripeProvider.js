import React from "react"
import { connect } from "react-redux"
import { StripeProvider } from "react-stripe-elements"

const StripeElementsContainer = ({ children, stripe }) => (
  <StripeProvider stripe={stripe}>{children}</StripeProvider>
)

export default connect(({ billing }) => ({ stripe: billing.stripe }))(
  StripeElementsContainer
)
