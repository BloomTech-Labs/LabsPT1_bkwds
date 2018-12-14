import express from "express"
import { userRouter } from "./resources/user"
import { protect, register, login } from "./auth"

export const restRouter = express.Router()

restRouter.use("/register", register)
restRouter.use("/login", login)
restRouter.use("/users", protect, userRouter)
