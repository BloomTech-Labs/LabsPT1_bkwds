import React, { Component } from "react"
import { Elements } from "react-stripe-elements"
import { connect } from "react-redux"
import styled from "styled-components"
import PropTypes from "prop-types"

import {
  closeCheckoutForm,
  openCheckoutForm
} from "../../redux/actions/billing"
import CheckoutForm from "../forms/CheckoutForm"
import Pending from "./Pending"
import StripeProvider from "./StripeProvider"
import { media } from "../../styles/theme/mixins"

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
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

  ${media.phone`
    width: 350px;

    h4 {
      padding: 0 25px;
    }

    .detail {
      padding: 20px 25px;
    }
  `}
`

class PaymentDetails extends Component {
  componentDidMount() {
    this.props.openCheckoutForm()
  }

  componentWillUnmount() {
    this.props.closeCheckoutForm()
  }

  componentDidUpdate(prevProps) {
    const { history, pending } = this.props
    if (prevProps.pending && !pending) {
      history.push("/app/billing")
    }
  }

  render() {
    return (
      <PaymentContainer>
        <h4>Payment details</h4>
        <div className="detail">
          <div className="detail-text">
            <span className="detail-bold">Pro Plan</span>
          </div>
          <div className="detail-text">
            <span className="detail-bold">Total:</span>
            <span>$9.99 /yr</span>
          </div>
        </div>
        <StripeProvider>
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>
        {this.props.pending && <Pending />}
      </PaymentContainer>
    )
  }
}

PaymentDetails.propTypes = {
  pending: PropTypes.bool.isRequired,
  closeCheckoutForm: PropTypes.func.isRequired,
  openCheckoutForm: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  pending: state.billing.pending
})

const mapDispatchToProps = {
  closeCheckoutForm,
  openCheckoutForm
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentDetails)
