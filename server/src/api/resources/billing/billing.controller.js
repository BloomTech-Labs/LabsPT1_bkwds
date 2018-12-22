import * as userController from "../../resources/user/user.controller"

export const subscribe = (req, res, stripe) => {
  const { email } = req.body
  stripe.customers
    .create({ email })
    .then(result => {
      const requestWithCustomerId = {
        ...req,
        body: { customerId: result.id, subscribed: true }
      }
      userController.updateUser(requestWithCustomerId, res)
    })
    .catch(error => res.status(500).send("Try again", error))
}

// export const unsubscribe = (req, res, stripe) => {

// }

export const subscribeToPaidPlan = (stripeCustomerId, plan) => {
  this.subscriptions.create({
    customer: stripeCustomerId,
    items: [{ plan }]
  })
}
