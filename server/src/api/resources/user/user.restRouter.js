import express from "express"
import { getAllUsers, createUser } from "./user.controller"

export const userRouter = express.Router()

userRouter
  .route("/")
  .get(getAllUsers)
  .post(createUser)

// userRouter.route("/:id")
// .get(getOneUser)
//   .put(userController.updateOne)
//   .delete(userController.deleteOne)
