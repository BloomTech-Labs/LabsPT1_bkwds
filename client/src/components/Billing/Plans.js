import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import PropTypes from "prop-types"

import { media } from "../../styles/theme/mixins"
import { BillingStyles } from "../../styles/Billing.styles"

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  grid-auto-rows: auto;
  grid-gap: 20px;
  padding: 50px;
  margin-top: 10px;
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 8px 24px rgba(13, 13, 18, 0.04);

  h2 {
    left: -5px;
    text-align: center;
    margin: 0;
  }

  span {
    padding: 8px 0 8px 0;
    margin: 0;
    height: 40px;
  }

  div {
    width: 150px;
  }

  .plans-monthly {
    padding: 0;
    margin-bottom: 30px;
    font-size: 0.85rem;
    color: grey;
  }

  .plans-current {
    padding-bottom: 0.14rem;
    margin-top: 30px;
    font-weight: 500;
    color: grey;
  }

  .plans-upgrade {
    margin-top: 30px;
    font-weight: 500;
    color: grey;
  }

  .plans-mobile {
    display: none;
    visibility: hidden;
    padding: 0;
    margin: 0;
  }

  a {
    color: #f26a21;
    text-decoration: none;
    padding-bottom: 0.14rem;
    border-bottom: 2px solid #f26a21;
  }

  ${media.tablet`
    grid-template-columns: 1fr 1fr;
    max-width: 640px;
    padding: 30px;

    h2 {
      text-align: left;
    }

    div {
      width: inherit;
    }

    .plans-mobile {
      display: inline-block;
      visibility: visible;
    }

    .check {
      margin-left: 5px;
    }
  `}

  ${media.phone`
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    max-width: 320px;

    div {
      width: inherit;
    }

    .plans-spacer {
      display: none;
      visibility: hidden;
    }
  `}
`

const Spacer = styled.div`
  height: 122px;
`

const Features = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 20px 0;

  ${media.tablet`
    display: none;
    visibility: hidden;
  `}
`

const FreeColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 10px 0;
  border-radius: 10px;
  background: #d0f0fd;
  text-align: center;

  ${media.tablet`
    padding: 30px;
    text-align: left;
  `}
`

const PaidColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 20px 0;
  border-radius: 10px;
  background: #ffeab6;
  text-align: center;

  ${media.tablet`
    padding: 30px;
    text-align: left;
  `}
`

const Plans = ({ isSubscribed }) => (
  <BillingStyles>
    <h4>Choose a plan</h4>
    <Container>
      <Features>
        <Spacer />
        <span># of trips tracked</span>
        <span># of archived trips</span>
        <span># of trip photos</span>
        <span>Safety features</span>
        <span>Trip analysis</span>
        <span>24/7 support</span>
      </Features>
      <FreeColumn>
        <h2>$0</h2>
        <span className="plans-monthly">per month</span>
        <span>
          2 per month
          <span className="plans-mobile">&nbsp;number of trips</span>
        </span>
        <span>
          50
          <span className="plans-mobile">&nbsp;archived trips</span>
        </span>
        <span>1 photo per trip</span>
        <span>
          <i className="fa fa-check" />
          <span className="plans-spacer">&nbsp;</span>
        </span>
        <span>
          <i className="fa fa-check" />
          <span className="plans-spacer">&nbsp;</span>
        </span>
        <span>
          <i className="fa fa-check" />
          <span className="plans-spacer">&nbsp;</span>
        </span>
        <span className="plans-current">
          {isSubscribed ? "Free" : "Current plan"}
        </span>
      </FreeColumn>
      <PaidColumn>
        <h2>$10</h2>
        <span className="plans-monthly">per month</span>
        <span>
          Unlimited
          <span className="plans-mobile">&nbsp;number of trips</span>
        </span>
        <span>
          Unlimited
          <span className="plans-mobile">&nbsp;archived trips</span>
        </span>
        <span>
          Unlimited
          <span className="plans-mobile">&nbsp;trip photos</span>
        </span>
        <span>
          <i className="fa fa-check" />
          <span className="plans-mobile check">&nbsp;Safety features</span>
        </span>
        <span>
          <i className="fa fa-check" />
          <span className="plans-mobile check">&nbsp;Trip analysis</span>
        </span>
        <span>
          <i className="fa fa-check" />
          <span className="plans-mobile check">&nbsp;24/7 support</span>
        </span>
        <span className="plans-upgrade">
          {isSubscribed ? (
            "Current plan"
          ) : (
            <Link to="/app/billing/payment">Upgrade</Link>
          )}
        </span>
      </PaidColumn>
    </Container>
  </BillingStyles>
)

Plans.propTypes = {
  isSubscribed: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  isSubscribed: auth.user.subscribed
})

export default connect(mapStateToProps)(Plans)
