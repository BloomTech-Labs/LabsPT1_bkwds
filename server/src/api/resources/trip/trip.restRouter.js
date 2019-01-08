import express from "express"
import tripController from "./trip.controller"

export const tripRouter = express.Router()

// tripRouter.param("id", tripController.findByParam)

tripRouter
  .route("/")
  .get(tripController.getAllTrips)
  .post(tripController.createTrip)

tripRouter
  .route("/:id")
  .get(tripController.getOneTrip)
  .put(tripController.updateTrip)
  .delete(tripController.deleteTrip)

tripRouter.route("/:id/waypoints").get(tripController.populateWaypoints)
