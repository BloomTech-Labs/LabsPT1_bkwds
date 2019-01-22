import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { Link, withRouter } from "react-router-dom"
import styled from "styled-components"

import { cancelSubscription } from "../../redux/actions/billing"
import { Button } from "../../styles/theme/styledComponents"
import { media } from "../../styles/theme/mixins"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 525px;

  div {
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin-top: 10px;
    padding: 30px;
    background: white;
    border: 1px solid #d73a49;
    border-radius: 3px;
    box-shadow: 0px 8px 24px rgba(13, 13, 18, 0.04);
  }

  a {
    font-weight: 500;
  }

  button {
    margin: 0;
    height: 36px;
  }

  ${media.phone`
    max-width: 300px;

    div {
      grid-template-columns: 1fr;
      grid-template-rows: 2fr 1fr;
      grid-gap: 15px;
      padding: 15px;
    }
  `}
`

const AccountType = ({
  cancelSubscription,
  id,
  history,
  isSubscribed,
  subscribeId
}) => {
  const handleCancel = () => {
    if (subscribeId) {
      cancelSubscription({ id, subscribeId })
    }
  }
  const upgradeButton = (
    <Button color="orange" onClick={() => history.push("/app/upgrade")}>
      Upgrade
    </Button>
  )
  const unsubscribeButton = <Button onClick={handleCancel}>Unsubscribe</Button>

  return (
    <Container>
      <h4>Change your plan</h4>
      <span>
        <b>Current plan:</b> {isSubscribed ? "Premium" : "Free"}
      </span>
      <div>
        <span>
          If you downgrade, you’ll lose access to{" "}
          <Link to="/app/upgrade">
            unlimited archived trips and other features.
          </Link>
        </span>
        {isSubscribed ? unsubscribeButton : upgradeButton}
      </div>
    </Container>
  )
}

const mapStateToProps = ({ auth }) => ({
  isSubscribed: auth.user.subscribed,
  id: auth.user.id,
  subscribeId: auth.user.subscribeId
})

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { cancelSubscription }
  )
)(AccountType)
