import express from "express"
import * as paymentController from "./payment.controller"

export const paymentRouter = express.Router()

paymentRouter
  .route("/")
  .get(paymentController.get)