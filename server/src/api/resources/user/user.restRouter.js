import express from "express"
import * as userController from "./user.controller"

export const userRouter = express.Router()

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)

userRouter
  .route("/:id")
  .get(userController.getOneUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

userRouter.route("/:id/trips").get(userController.getUserTrips)
