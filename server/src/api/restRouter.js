import express from "express"
import { userRouter } from "./resources/user"
import { tripRouter } from "./resources/trip"
import { protect, register, login, getUserFromToken } from "./modules/auth"

export const restRouter = express.Router()

restRouter.route("/register").post(register)
restRouter.route("/login").post(login)
restRouter.route("/user_from_token").post(getUserFromToken)
restRouter.use("/users", protect, userRouter)
restRouter.use("/trips", tripRouter)
