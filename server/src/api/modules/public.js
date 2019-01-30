import express from "express"
import { Trip } from "./trip.model"

const getAllPublicTrips = (req, res) => {
  Trip.find({ isPublic: true })
    .then(trips => {
      res.status(200).json(trips)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const getOnePublicTrip = (req, res) => {
  Trip.findOne({ _id: req.params.id })
    .populate("waypoints")
    .exec()
    .then(trip => {
      if (trip.isPublic === false) {
        return res.status(401).json("Trip is not publicly available")
      }
      res.status(200).json(trip)
    })
    .catch(err => {
      return res.status(500).send(err)
    })
}
export const publicRouter = express.Router()

publicRouter.route("/trips").get(getAllPublicTrips)
publicRouter.route("/trips/:id").get(getOnePublicTrip)
