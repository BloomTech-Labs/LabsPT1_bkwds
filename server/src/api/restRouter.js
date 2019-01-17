import express from "express"
import { userRouter } from "./resources/user"
import { tripRouter } from "./resources/trip"
import { waypointRouter } from "./resources/waypoint"
import { protect, register, login, changePassword } from "./modules/auth"
import { subscribeRouter } from "./resources/subscribe"
import { emailRouter } from "./resources/email"

export const restRouter = express.Router()

restRouter.route("/register").post(register)
restRouter.route("/login").post(login)
restRouter.route("/changePassword").post(changePassword)

restRouter.use("/users", userRouter)
restRouter.use("/trips", tripRouter)
restRouter.use("/waypoints", waypointRouter)

// restRouter.use("/users", protect, userRouter)
// restRouter.use("/trips", protect, tripRouter)
// restRouter.use("/waypoints", protect, waypointRouter)

restRouter.use("/subscribe", protect, subscribeRouter)

restRouter.use("/reset_password", emailRouter)
