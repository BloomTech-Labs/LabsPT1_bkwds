import express from "express"
import * as emailController from "./email.controller"

export const emailRouter = express.Router()

// emailRouter.route("/user/:userId").get(emailController.sendPasswordReset)

emailRouter.route("/").get(emailController.sendPasswordReset)
