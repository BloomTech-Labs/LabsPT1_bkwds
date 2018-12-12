import express from "express"
import { userRouter } from "./resources/user"

export const restRouter = express.Router()

restRouter.use("/user", userRouter)
