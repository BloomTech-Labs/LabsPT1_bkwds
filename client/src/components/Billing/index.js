import React from "react"
import * as s from "../../styles/Billing.styles"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import {
  closeCheckoutForm,
  openCheckoutForm,
  cancelSubscription,
  retrieveInvoices
} from "../../redux/actions/billing"

import Invoices from "./Invoices"
import PaymentDetails from "./PaymentDetails"
import AccountType from "./AccountType"
import { UserPropTypes } from "../propTypes"

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
        <h3>Billing overview</h3>
        {isPending || <AccountType />}
        {isCheckoutFormOpen && <PaymentDetails />}
        {isSubscribed && invoices && <Invoices invoices={invoices} />}
      </s.BillingStyles>
    )
  }
}

Billing.propTypes = {
  user: UserPropTypes.isRequired,
  closeCheckoutForm: PropTypes.func.isRequired,
  openCheckoutForm: PropTypes.func.isRequired,
  cancelSubscription: PropTypes.func.isRequired,
  retrieveInvoices: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  isCheckoutFormOpen: PropTypes.bool.isRequired,
  invoices: PropTypes.array.isRequired
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
