import express from "express"
import * as emailController from "./email.controller"

export const emailRouter = express.Router()

emailRouter.route("/user/:email").post(emailController.sendPasswordReset)

emailRouter
  .route("/receive_new_password/:userId/:token")
  .post(emailController.receiveNewPassword)

// Don't think we need this? keeping around just in case
// emailRouter
//   .route("/get_token_hash/:userId")
//   .get(emailController.encodePasswordHashAsToken)
