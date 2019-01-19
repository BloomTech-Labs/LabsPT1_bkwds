import React from "react"
import { connect } from "react-redux"

import {
  closeCheckoutForm,
  openCheckoutForm,
  cancelSubscription
} from "../../redux/actions/billing"
import { Button } from "../../styles/theme/styledComponents"

const AccountType = ({
  cancelSubscription,
  id,
  isSubscribed,
  openCheckoutForm,
  subscribeId
}) => {
  const handleCancel = () => {
    if (subscribeId) {
      cancelSubscription({ id, subscribeId })
    }
  }
  const upgradeButton = (
    <Button onClick={() => openCheckoutForm()}>Upgrade to Premium</Button>
  )
  const unsubscribeButton = <Button onClick={handleCancel}>Unsubscribe</Button>

  return (
    <>
      <span>
        <b>Plan:</b> {isSubscribed ? "Premium" : "Free"}
      </span>
      {isSubscribed ? unsubscribeButton : upgradeButton}
    </>
  )
}

const mapStateToProps = ({ auth, billing }) => ({
  isCheckoutFormOpen: billing.isCheckoutFormOpen,
  isSubscribed: auth.user.subscribed,
  id: auth.user.id,
  subscribeId: auth.user.subscribeId
})

const mapDispatchToProps = {
  closeCheckoutForm,
  openCheckoutForm,
  cancelSubscription
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountType)
