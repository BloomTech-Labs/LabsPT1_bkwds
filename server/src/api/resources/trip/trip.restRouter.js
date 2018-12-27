import express from "express"
import tripController from "./trip.controller"

export const tripRouter = express.Router()

tripRouter.param("id", tripController.findByParam)

tripRouter
  .route("/")
  .get(tripController.getAll)
  .post(tripController.createOne)

tripRouter
  .route("/:id")
  .get(tripController.getOne)
  .put(tripController.updateOne)
  .delete(tripController.deleteOne)
