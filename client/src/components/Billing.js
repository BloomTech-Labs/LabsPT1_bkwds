import React from "react"
import * as s from "../styles/Billing.styles"
import { connect } from "react-redux"
import axios from "axios"
import { SERVER_URI } from "../config"

import { Elements, StripeProvider } from "react-stripe-elements"
import CheckoutForm from "./forms/CheckoutForm"
import { Form, Button } from "../styles/theme/styledComponents"

class Billing extends React.Component {
  state = {
    currentPlan: null,
    selectedPlanId: ""
  }

  async componentDidMount() {
    const { subscribeId } = this.props.user

    if (subscribeId) {
      const result = await axios.get(`${SERVER_URI}/subscribe/${subscribeId}`)
      if (result.data) {
        const { plan } = result.data.items.data[0]
        this.setState({ currentPlan: plan })
      } else {
        console.log(result.error)
      }
    } else {
      this.setState({ currentPlan: { nickname: "Free" } })
    }
  }

  handleChangePlan = e => {
    this.setState({
      selectedPlanName: e.target.value,
      selectedPlanId: e.target.value === "paid" ? "plan_ECNDe6gLWxZ3cQ" : ""
    })
  }

  handleCancel = async () => {
    const { id, subscribeId } = this.props.user
    if (subscribeId) {
      const result = await axios.post(`${SERVER_URI}/subscribe/cancel/${id}`, {
        subscribeId
      })
      if (result.data) {
        this.setState({ currentPlan: { nickname: "Free" } })
      } else {
        console.log(result.error)
      }
    }
  }

  handleCompleteSubscribe = () => {
    return null
  }

  render() {
    const { isLoggedIn, user } = this.props
    const isSubscribed = user.subscribed
    const { currentPlan } = this.state
    return (
      <StripeProvider apiKey="pk_test_12RJOzHXwYtqfRwncplH3B6V">
        <s.BillingStyles>
          {isLoggedIn && (
            <>
              {isSubscribed ? (
                <>
                  <h3>Current Plan</h3>
                  <div>{currentPlan && currentPlan.nickname}</div>
                  {currentPlan && currentPlan.nickname !== "Free" ? (
                    <Button
                      style={{ marginTop: "100px", width: "120px" }}
                      onClick={this.handleCancel}
                    >
                      Unsubscribe
                    </Button>
                  ) : (
                    <>
                      <h3>Upgrade to Paid Plan</h3>
                      <Plan
                        planId={this.state.selectedPlanId}
                        planName={this.state.selectedPlanName}
                        onChangePlan={this.handleChangePlan}
                        onCompleteSubscribe={this.handleCompleteSubscribe}
                      />
                    </>
                  )}
                </>
              ) : (
                <Plan
                  planId={this.state.selectedPlanId}
                  planName={this.state.selectedPlanName}
                  onChangePlan={this.handleChangePlan}
                  onCompleteSubscribe={this.handleCompleteSubscribe}
                />
              )}
            </>
          )}
        </s.BillingStyles>
      </StripeProvider>
    )
  }
}

const Plan = ({ planId, planName, onChangePlan, onCompleteSubscribe }) => (
  <>
    <h4>Account Plans</h4>
    <Form>
      <div style={{ display: "inline-flex" }}>
        <input
          type="radio"
          value="free"
          checked={planName === "free"}
          onChange={onChangePlan}
        />
        <span>Free plan</span>
      </div>
      <div style={{ display: "inline-flex" }}>
        <input
          type="radio"
          value="paid"
          checked={planName === "paid"}
          onChange={onChangePlan}
        />
        <span>Paid plan</span>
      </div>
    </Form>
    {planName === "paid" ? (
      <>
        <h4>Payment Detail</h4>
        <div className="detail">
          <div>Total: $10/yearly</div>
          <div>Next billing date: 01/01/2020</div>
        </div>
        <Elements>
          <CheckoutForm
            planId={planId}
            onCompleteSubscribe={onCompleteSubscribe}
          />
        </Elements>
      </>
    ) : (
      <Button style={{ width: "200px" }}>Subscribe Now</Button>
    )}
  </>
)

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  }
}

export default connect(
  mapStateToProps,
  null
)(Billing)
