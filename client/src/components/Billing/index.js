import React from "react"
import * as s from "../../styles/Billing.styles"
import { connect } from "react-redux"

import {
  closeCheckoutForm,
  openCheckoutForm,
  cancelSubscription,
  retrieveInvoices
} from "../../redux/actions/billing"

import Invoices from "./Invoices"
import PaymentDetails from "./PaymentDetails"
import AccountType from "./AccountType"
import Plans from "./Plans"

class Billing extends React.Component {
  componentDidMount() {
    const { customerId, subscribeId } = this.props.user

    if (subscribeId && customerId) {
      this.props.retrieveInvoices(customerId, subscribeId)
    }
  }

  componentDidUpdate(prevProps) {
    const { retrieveInvoices, user } = this.props

    if (!prevProps.user.subscribed && user.subscribed && user.subscribeId) {
      retrieveInvoices(user.customerId, user.subscribeId)
    }
  }

  componentWillUnmount() {
    this.props.closeCheckoutForm()
  }

  render() {
    const { isCheckoutFormOpen, invoices, isPending, isSubscribed } = this.props

    return (
      <s.BillingStyles>
        <h4>Choose a plan</h4>
        <Plans />
        {/* isPending || <AccountType /> */}
        {isCheckoutFormOpen && <PaymentDetails />}
        {isSubscribed && invoices && <Invoices invoices={invoices} />}
      </s.BillingStyles>
    )
  }
}

const mapStateToProps = state => {
  return {
    hasError: state.billing.error,
    invoices: state.billing.invoices,
    isCheckoutFormOpen: state.billing.isCheckoutFormOpen,
    isLoggedIn: state.auth.isLoggedIn,
    isPending: state.billing.pending,
    isSubscribed: state.auth.user.subscribed,
    user: state.auth.user
  }
}

const mapDispatchToProps = {
  closeCheckoutForm,
  openCheckoutForm,
  cancelSubscription,
  retrieveInvoices
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing)
