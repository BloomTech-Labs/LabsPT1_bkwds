import React, { Component } from "react"
import { Elements } from "react-stripe-elements"
import { connect } from "react-redux"
import styled from "styled-components"
import moment from "moment"

import {
  closeCheckoutForm,
  openCheckoutForm,
  cancelSubscription,
  retrieveInvoices
} from "../../redux/actions/billing"
import CheckoutForm from "../forms/CheckoutForm"
import StripeProvider from "./StripeProvider"

const PaymentContainer = styled.div`
  margin: 50px auto 0;
  padding: 50px 0;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0px 8px 24px rgba(13, 13, 18, 0.04);
  background: white;

  h4 {
    padding: 0 50px;
  }

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fbfbfd;
    border-top: 1px solid #e6e6eb;
    border-bottom: 1px solid #e6e6eb;
    box-shadow: inset 0 2px 6px 0 rgba(0, 0, 0, 0.025);
    margin-bottom: 0;
    margin-top: 16px;
    padding: 20px 50px;
  }

  .detail-bold {
    font-weight: 500;
  }

  .detail-text {
    display: flex;
    justify-content: space-between;
  }
`

class PaymentDetails extends Component {
  componentDidMount() {
    this.props.openCheckoutForm()
  }

  componentWillUnmount() {
    this.props.closeCheckoutForm()
  }

  render() {
    return (
      <PaymentContainer>
        <h4>Payment details</h4>
        <div className="detail">
          <div className="detail-text">
            <span className="detail-bold">Total:</span>
            <span>$10 /yr</span>
          </div>
          <div className="detail-text">
            <span className="detail-bold">Next billing date:</span>
            <span>
              {moment()
                .add(1, "year")
                .format("MMM Do, YYYY")}
            </span>
          </div>
        </div>
        <StripeProvider>
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>
      </PaymentContainer>
    )
  }
}

const mapDispatchToProps = {
  closeCheckoutForm,
  openCheckoutForm,
  cancelSubscription,
  retrieveInvoices
}

export default connect(
  null,
  mapDispatchToProps
)(PaymentDetails)
