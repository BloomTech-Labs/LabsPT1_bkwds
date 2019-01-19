import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import { Button } from "../../styles/theme/styledComponents"

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  grid-auto-rows: auto;
  grid-gap: 20px;
  padding: 50px;
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  background: white;

  h2 {
    text-align: center;
    margin: 0;
  }

  span {
    padding: 8px 0 8px 0;
    margin: 0;
  }

  div {
    width: 150px;
  }

  .plan-monthly {
    padding: 0;
    margin-bottom: 30px;
    font-size: 0.85rem;
    color: grey;
  }

  .plan-current {
    padding-bottom: 0.14rem;
    margin-top: 50px;
    font-weight: 500;
    color: grey;
  }

  .plan-upgrade {
    margin-top: 50px;
    font-weight: 500;
    color: #f26a21;
    text-decoration: none;

    a {
      padding-bottom: 0.14rem;
      border-bottom: 2px solid #f26a21;
    }
  }
`

const Spacer = styled.div`
  height: 102px;
`

const Features = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 20px 0;
`

const FreeColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 10px 0;
  border-radius: 10px;
  background: #d0f0fd;
  text-align: center;
`

const PaidColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 20px 0;
  border-radius: 10px;
  background: #ffeab6;
  text-align: center;
`

const Plans = ({ isSubscribed }) => (
  <Container>
    <Features>
      <Spacer />
      <span># of trips tracked</span>
      <span># of archived trips</span>
      <span>Safety features</span>
      <span>Feature 4</span>
      <span>Feature 5</span>
      <span>Feature 6</span>
      <span>Feature 7</span>
      <span>Feature 8</span>
    </Features>
    <FreeColumn>
      <h2>$0</h2>
      <span className="plan-monthly">per month</span>
      <span>Unlimited</span>
      <span>100</span>
      <span>
        <i className="fa fa-check" />
      </span>
      <span>Testing</span>
      <span>
        <i className="fa fa-check" />
      </span>
      <span>
        <i className="fa fa-check" />
      </span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span className="plan-current">{isSubscribed ? "" : "Current plan"}</span>
    </FreeColumn>
    <PaidColumn>
      <h2>$10</h2>
      <span className="plan-monthly">per month</span>
      <span>Unlimited</span>
      <span>Unlimited</span>
      <span>
        <i className="fa fa-check" />
      </span>
      <span>
        <i className="fa fa-check" />
      </span>
      <span>
        <i className="fa fa-check" />
      </span>
      <span>
        <i className="fa fa-check" />
      </span>
      <span>
        <i className="fa fa-check" />
      </span>
      <span>
        <i className="fa fa-check" />
      </span>
      <span>
        <i className="fa fa-check" />
      </span>
      <span className="plan-upgrade">
        {isSubscribed ? "" : <a>"Upgrade"</a>}
      </span>
    </PaidColumn>
  </Container>
)

const mapStateToProps = ({ auth }) => ({
  isSubscribed: auth.user.subscribed
})

export default connect(mapStateToProps)(Plans)
