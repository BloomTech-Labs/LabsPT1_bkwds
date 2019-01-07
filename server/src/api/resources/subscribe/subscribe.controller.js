import * as userController from "../user/user.controller"

export const getSubscription = async (req, res, stripe) => {
  const { subscribeId } = req.params
  const subscription = await stripe.subscriptions.retrieve(subscribeId)
  if (subscription) {
    return res.status(200).send(subscription)
  } else {
    return res.status(500).send("Stripe error: Cannot retrieve subscription.")
  }
}

export const subscribeToFreePlan = async (req, res, stripe) => {
  const { source } = req.body
  const customer = await stripe.customers.create({ source: source.id })

  if (customer) {
    const updatedRequest = {
      ...req,
      body: {
        subscribed: true,
        subdate: Date.now(),
        customerId: customerId,
        subscribeId: result.subscribeId
      }
    }
    return userController.updateUser(updatedRequest, res)
  } else {
    res.status(500).send({ error: "Stripe error: cannot create customer." })
  }
}

export const subscribeToPaidPlan = async (req, res, stripe) => {
  const { planId, source } = req.body
  const customer = await stripe.customers.create({ source: source.id })

  if (customer) {
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: planId }]
    })

    if (subscription) {
      const updatedRequest = {
        ...req,
        body: {
          subscribed: true,
          subdate: Date.now(),
          customerId: customer.id,
          subscribeId: subscription.id
        }
      }
      return userController.updateUser(updatedRequest, res)
    } else {
      res
        .status(500)
        .send({ error: "Stripe error: cannot create subscription." })
    }
  }
  res.status(500).send({ error: "Stripe error: cannot create customer." })
}

export const cancel = async (req, res, stripe) => {
  const { subscribeId } = req.body
  const cancellation = await stripe.subscriptions.del(subscribeId)
  if (cancellation) {
    const updatedRequest = {
      ...req,
      body: {
        subscribed: true,
        subdate: Date.now(),
        customerId: "",
        subscribeId: ""
      }
    }
    return userController.updateUser(updatedRequest, res)
  } else {
    return res.status(500).send("Stripe error: Cannot cancel subscription.")
  }
}
