import express from "express"
import * as emailController from "./email.controller"

export const emailRouter = express.Router()

emailRouter.route("/user/:email").post(emailController.sendPasswordReset)

emailRouter
  .route("/get_token_hash/:userId")
  .get(emailController.encodePasswordHashAsToken)
