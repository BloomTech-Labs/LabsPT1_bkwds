import express from "express"
import * as subscribeController from "./subscribe.controller"

export const subscribeRouter = express.Router()
const stripe = require("stripe")(process.env.STRIPE_KEY_SERVER_TEST)

subscribeRouter
  .route("/:id")
  .post((req, res) => subscribeController.subscribe(req, res, stripe))

subscribeRouter
  .route("/cancel/:id")
  .post((req, res) => subscribeController.cancel(req, res, stripe))
