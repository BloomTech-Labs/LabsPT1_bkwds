import React from "react"
import { BillingStyles } from "../../styles/Billing.styles"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { retrieveInvoices } from "../../redux/actions/billing"
import Pending from "./Pending"
import Invoices from "./Invoices"
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

  render() {
    const { invoices, isPending } = this.props

    return (
      <BillingStyles>
        {invoices && <Invoices invoices={invoices} />}
        {<AccountType />}
        {isPending && <Pending />}
      </BillingStyles>
    )
  }
}

Billing.propTypes = {
  invoices: PropTypes.array,
  isPending: PropTypes.bool.isRequired,
  retrieveInvoices: PropTypes.func,
  user: UserPropTypes
}

const mapStateToProps = ({ billing, auth }) => ({
  invoices: billing.invoices,
  isPending: billing.pending,
  user: auth.user
})

export default connect(
  mapStateToProps,
  { retrieveInvoices }
)(Billing)
