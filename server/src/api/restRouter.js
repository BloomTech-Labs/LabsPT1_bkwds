import express from "express"
import { userRouter } from "./resources/user"
import { protect, register, login } from "./modules/auth"

export const restRouter = express.Router()

restRouter.route("/register").post(register)
restRouter.route("/login").post(login)
restRouter.use("/users", protect, userRouter)
