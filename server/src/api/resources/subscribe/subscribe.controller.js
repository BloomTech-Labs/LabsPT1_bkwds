import * as userController from "../user/user.controller"

export const subscribe = async (req, res, stripe) => {
  const { planId, source } = req.body

  try {
    const customer = await stripe.customers.create(
      { source: source.id },
      { api_key: process.env.STRIPE_KEY_SERVER_TEST }
    )

    const subscription = await stripe.subscriptions.create(
      {
        customer: customer.id,
        items: [{ plan: planId }]
      },
      { api_key: process.env.STRIPE_KEY_SERVER_TEST }
    )

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
  } catch (error) {
    res.status(error.statusCode).send(error.message)
  }
}

export const cancel = async (req, res, stripe) => {
  const { subscribeId } = req.body
  try {
    await stripe.subscriptions.del(subscribeId, {
      api_key: process.env.STRIPE_KEY_SERVER_TEST
    })

    const updatedRequest = {
      ...req,
      body: {
        subscribed: false,
        subDate: "",
        customerId: "",
        subscribeId: ""
      }
    }
    return userController.updateUser(updatedRequest, res)
  } catch (error) {
    return res.status(error.statusCode).send(error.message)
  }
}

export const retrieveInvoices = async (req, res, stripe) => {
  const { customerId, subscribeId } = req.body
  try {
    const result = await stripe.invoices.list(
      { customer: customerId, subscription: subscribeId },
      {
        api_key: process.env.STRIPE_KEY_SERVER_TEST
      }
    )
    return res.status(200).send(result.data)
  } catch (error) {
    return res.status(error.statusCode).send(error.message)
  }
}
