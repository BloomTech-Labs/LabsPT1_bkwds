import express from "express"
import * as billingController from "./billing.controller"
import config from "../../../config"

export const billingRouter = express.Router()
const stripe = config.stripe.instance

billingRouter
  .route("/subscribe/:id")
  .post((req, res) => billingController.subscribe(req, res, stripe))
