import * as userController from "../user/user.controller"

export const subscribe = async (req, res, stripe) => {
  const { planId, source } = req.body
  const customer = await stripe.customers.create(
    { source: source.id },
    { api_key: process.env.STRIPE_KEY_SERVER_TEST }
  )

  if (customer) {
    const subscription = await stripe.subscriptions.create(
      {
        customer: customer.id,
        items: [{ plan: planId }]
      },
      { api_key: process.env.STRIPE_KEY_SERVER_TEST }
    )

    if (subscription) {
      const updatedRequest = {
        ...req,
        body: {
          subscribed: true,
          subDate: Date.now(),
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
  const cancellation = await stripe.subscriptions.del(subscribeId, {
    api_key: process.env.STRIPE_KEY_SERVER_TEST
  })
  if (cancellation) {
    const updatedRequest = {
      ...req,
      body: {
        subscribed: false,
        subDate: "",
        customerId: null,
        subscribeId: null
      }
    }
    return userController.updateUser(updatedRequest, res)
  } else {
    return res.status(500).send("Stripe error: Cannot cancel subscription.")
  }
}
