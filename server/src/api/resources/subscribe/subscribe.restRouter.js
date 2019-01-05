import express from "express"
import * as subscribeController from "./subscribe.controller"
import config from "../../../config"

export const subscribeRouter = express.Router()
const stripe = config.stripe.instance

subscribeRouter
  .route("/free/:id")
  .post((req, res) => subscribeController.subscribeToFreePlan(req, res, stripe))

subscribeRouter
  .route("/payment/add")
  .post((req, res) => subscribeController.addPayment(req, res, stripe))
subscribeRouter
  .route("/paid/:id")
  .post((req, res) => subscribeController.subscribeToPaidPlan(req, res, stripe))
