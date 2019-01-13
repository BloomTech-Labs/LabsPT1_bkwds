import React from "react"
import * as s from "../styles/Billing.styles"
import { connect } from "react-redux"
import { openCheckoutForm, cancelSubscription } from "../redux/actions/billing"

import { Elements, StripeProvider } from "react-stripe-elements"
import CheckoutForm from "./forms/CheckoutForm"
import { Button } from "../styles/theme/styledComponents"
import { STRIPE_KEY } from "../config"

class Billing extends React.Component {
  state = {}

  handleOpenCheckoutForm = () => {
    this.props.openCheckoutForm()
  }

  handleCancel = () => {
    const { id, subscribeId } = this.props.user
    if (subscribeId) {
      this.props.cancelSubscription({ id, subscribeId })
    }
  }

  render() {
    const { isLoggedIn, user, isPending, isCheckoutFormOpen } = this.props
    const isSubscribed = user.subscribed
    return (
      <StripeProvider apiKey={STRIPE_KEY}>
        <s.BillingStyles>
          {isLoggedIn && !isPending && (
            <>
              <h3>Account Type</h3>
              {!isSubscribed ? (
                <>
                  <span>Free</span>
                  {!isCheckoutFormOpen && (
                    <Button
                      styles={{ width: "200px", marginTop: "20px" }}
                      onClick={this.handleOpenCheckoutForm}
                    >
                      Upgrade to Premium
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <span>Premium</span>
                  <Button
                    styles={{ width: "150px", marginTop: "20px" }}
                    onClick={this.handleCancel}
                  >
                    Unsubscribe
                  </Button>
                </>
              )}
            </>
          )}
          {isCheckoutFormOpen && (
            <>
              <h3>Payment Detail</h3>
              <div className="detail">
                <div>Total: $10/yearly</div>
                <div>Next billing date: 01/01/2020</div>
              </div>
              <Elements>
                <CheckoutForm />
              </Elements>
            </>
          )}
        </s.BillingStyles>
      </StripeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    isPending: state.billing.pending,
    isCheckoutFormOpen: state.billing.isCheckoutFormOpen,
    hasError: state.billing.error
  }
}

const mapDispatchToProps = { openCheckoutForm, cancelSubscription }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing)
