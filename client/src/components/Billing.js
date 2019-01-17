import React from "react"
import * as s from "../styles/Billing.styles"
import { connect } from "react-redux"
import moment from "moment"
import {
  openCheckoutForm,
  cancelSubscription,
  retrieveInvoices
} from "../redux/actions/billing"

import { Elements, StripeProvider } from "react-stripe-elements"
import CheckoutForm from "./forms/CheckoutForm"
import { Button } from "../styles/theme/styledComponents"
import { STRIPE_KEY } from "../config"

class Billing extends React.Component {
  state = {
    stripe: null,
    isCheckoutFormOpen: false
  }

  componentDidMount() {
    const { subscribeId, customerId } = this.props.user
    const stripeScript = document.createElement("script")
    stripeScript.src = "https://js.stripe.com/v3/"
    stripeScript.async = true
    stripeScript.onload = () => {
      setTimeout(() => {
        this.setState({ stripe: window.Stripe(STRIPE_KEY) })
      }, 1000)
    }
    document.body && document.body.appendChild(stripeScript)

    if (subscribeId && customerId) {
      this.props.retrieveInvoices(customerId, subscribeId)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPending && !this.props.isPending && !this.props.hasError) {
      this.setState({ isCheckoutFormOpen: false })
    }
    if (
      !prevProps.user.subscribed &&
      this.props.user.subscribed &&
      this.props.user.subscribeId
    ) {
      this.props.retrieveInvoices(
        this.props.user.customerId,
        this.props.user.subscribeId
      )
    }
  }

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
    const {
      isLoggedIn,
      user,
      isPending,
      isCheckoutFormOpen,
      invoices
    } = this.props
    const isSubscribed = user.subscribed
    return (
      <StripeProvider stripe={this.state.stripe}>
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
          {isSubscribed && invoices && (
            <>
              <h3>Invoices</h3>
              <table>
                <tr>
                  <th>Service</th>
                  <th>Period</th>
                </tr>
                {invoices.map(invoice => (
                  <tr key={invoice.id}>
                    <td>{invoice.lines.data[0].description}</td>
                    <td>
                      {moment
                        .unix(invoice.lines.data[0].period.start)
                        .format("YYYY-MM-DD")}
                      {" to "}
                      {moment
                        .unix(invoice.lines.data[0].period.end)
                        .format("YYYY-MM-DD")}
                    </td>
                  </tr>
                ))}
              </table>
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
    hasError: state.billing.error,
    invoices: state.billing.invoices
  }
}

const mapDispatchToProps = {
  openCheckoutForm,
  cancelSubscription,
  retrieveInvoices
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing)
