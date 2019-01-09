import express from "express"
import * as subscribeController from "./subscribe.controller"
import config from "../../../config"

export const subscribeRouter = express.Router()
const stripe = config.stripe.instance

subscribeRouter
  .route("/:id")
  .post((req, res) => subscribeController.subscribe(req, res, stripe))

subscribeRouter
  .route("/cancel/:id")
  .post((req, res) => subscribeController.cancel(req, res, stripe))
