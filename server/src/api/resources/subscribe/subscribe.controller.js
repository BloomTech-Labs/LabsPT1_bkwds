import * as userController from "../user/user.controller"

export const subscribeToFreePlan = (req, res, stripe) => {
  const { email } = req.body
  stripe.customers
    .create({ email })
    .then(result => {
      const updatedRequest = {
        ...req,
        body: {
          subscribed: true,
          subdate: Date.now(),
          customerId: result.id,
          subscribeId: ""
        }
      }
      userController.updateUser(updatedRequest, res)
    })
    .catch(error => res.status(500).send(error))
}

export const addPayment = (req, res, stripe) => {
  const { customerId, source } = req.body
  stripe.customers
    .createSource(customerId, {
      source
    })
    .then(result => res.status(200).send(result))
    .catch(error => res.status(400).send(error))
}

export const subscribeToPaidPlan = (req, res, stripe) => {
  const { customerId, planId } = req.body

  stripe.subscriptions
    .create({
      customer: customerId,
      items: [{ plan: planId }]
    })
    .then(result => {
      const updatedRequest = {
        ...req,
        body: {
          subscribed: true,
          subdate: Date.now(),
          customerId: customerId,
          subscribeId: result.subscribeId
        }
      }
      userController.updateUser(updatedRequest, res)
    })
    .catch(error => res.status(500).send(error))
}

// export const unsubscribe = (req, res, stripe) => {

// }
