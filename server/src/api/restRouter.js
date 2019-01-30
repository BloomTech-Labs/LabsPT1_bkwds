import express from "express"
import { userRouter } from "./resources/user"
import { tripRouter } from "./resources/trip"
import { waypointRouter } from "./resources/waypoint"
import { protect, register, login, changePassword } from "./modules/auth"
import { subscribeRouter } from "./resources/subscribe"
import { emailRouter } from "./resources/email"
import { sendSMSAlert } from "./modules/twilio"

export const restRouter = express.Router()

// Auth routes
restRouter.route("/register").post(register)
restRouter.route("/login").post(login)
restRouter.route("/changePassword").post(protect, changePassword)

// // Resource routes
// restRouter.use("/users", protect, userRouter)
// restRouter.use("/trips", protect, tripRouter)
// restRouter.use("/waypoints", protect, waypointRouter)

// // Service routes
// restRouter.use("/subscribe", protect, subscribeRouter)
// restRouter.use("/reset_password", emailRouter)
// restRouter.route("/send_sms").post(protect, sendSMSAlert)

// Resource routes
restRouter.use("/users", userRouter)
restRouter.use("/trips", tripRouter)
restRouter.use("/waypoints", waypointRouter)

// Service routes
restRouter.use("/subscribe", subscribeRouter)
restRouter.use("/reset_password", emailRouter)
restRouter.route("/send_sms").post(sendSMSAlert)
