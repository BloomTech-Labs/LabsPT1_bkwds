import React from "react"
import { connect } from "react-redux"
import { StripeProvider } from "react-stripe-elements"
import PropTypes from "prop-types"

const StripeElementsContainer = ({ children, stripe }) => (
  <StripeProvider stripe={stripe}>{children}</StripeProvider>
)

StripeElementsContainer.propTypes = {
  stripe: PropTypes.object,
  children: PropTypes.element.isRequired
}

export default connect(({ billing }) => ({ stripe: billing.stripe }))(
  StripeElementsContainer
)
