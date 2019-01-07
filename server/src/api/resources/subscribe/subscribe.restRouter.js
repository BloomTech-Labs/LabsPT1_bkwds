import express from "express"
import * as subscribeController from "./subscribe.controller"
import config from "../../../config"

export const subscribeRouter = express.Router()
const stripe = config.stripe.instance

subscribeRouter
  .route("/:subscribeId")
  .get((req, res) => subscribeController.getSubscription(req, res, stripe))

subscribeRouter
  .route("/free/:id")
  .post((req, res) => subscribeController.subscribeToFreePlan(req, res, stripe))

subscribeRouter
  .route("/paid/:id")
  .post((req, res) => subscribeController.subscribeToPaidPlan(req, res, stripe))

subscribeRouter
  .route("/cancel/:id")
  .post((req, res) => subscribeController.cancel(req, res, stripe))
