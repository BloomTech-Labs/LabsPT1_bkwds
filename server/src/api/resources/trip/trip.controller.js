import { Trip } from "./trip.model"
import { User } from "../user/user.model"
import { Waypoint } from "../waypoint/waypoint.model"

export const getAllTrips = (req, res) => {
  Trip.find({})
    .then(trips => {
      res.status(200).json(trips)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const createTrip = (req, res) => {
  const newTrip = new Trip({
    userId: req.body.userId,
    name: req.body.name,
    isArchived: req.body.isArchived,
    start: req.body.start,
    end: req.body.end,
    lat: req.body.lat,
    lon: req.body.lon
  })
  newTrip
    .save()
    .then(trip => {
      User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { trips: trip.id } }
      )
        .then(() => {
          res.status(201).json(trip)
        })
        .catch(() => {
          res.status(500).json("Error linking trip to User")
        })
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
}

export const getOneTrip = (req, res) => {
  Trip.findOne({ _id: req.params.id })
    .populate({ path: "waypoints", model: "Waypoint" })
    .exec()
    .then(trip => {
      res.status(200).json(trip)
    })
    .catch(err => {
      return res.status(500).send(err)
    })
}

// export const getOneTrip = (req, res) => {
//   Trip.findOne(req.params('id')).populateAll().exec(function(err, trip) {
//       if (err) res.status(500).send(err)
//       res.status(200).json(trip)
//     })
// }

export const updateTrip = (req, res) => {
  const id = req.params.id
  const update = req.body

  if (update.waypoints)
    return res
      .status(401)
      .send(
        "Waypoints cannot be modified from Trip model. Use Waypoint model instead"
      )

  Trip.findOneAndUpdate({ _id: id }, update)
    .then(oldTrip => {
      Trip.findOne({ _id: oldTrip.id })
        .then(newTrip => {
          res.status(200).json(newTrip)
        })
        .catch(() => {
          res.status(404).json("Not Found")
        })
    })
    .catch(() => {
      res.status(404).json("Not Found")
    })
}

export const deleteTrip = (req, res) => {
  Trip.findOneAndDelete({ _id: req.params.id })
    .then(trip => {
      if (!trip) return res.status(404).send("trip not found")
      Waypoint.deleteMany({ tripId: trip.id })
        .then(() => {
          User.findByIdAndUpdate({ _id: trip.userId }, { trips: [] })
            .then(() => {
              const payload = {
                trip,
                msg: "Trip was deleted"
              }
              res.status(202).json(payload)
            })
            .catch(err => {
              res.status(500).send(err)
            })
        })
        .catch(err => {
          res.status(500).send(err)
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const populateWaypoints = (req, res) => {
  Trip.findById(req.params.id)
    .populate("waypoints")
    .exec(function(err, trip) {
      if (err) res.status(500).send(err)
      res.status(200).json(trip.waypoints)
    })
}

export const repeatTrip = (req, res) => {
  const tripLength = Date.parse(req.body.end) - Date.parse(req.body.start)
  const currentTime = Date.now()

  const updatedRequest = {
    ...req,
    body: {
      ...req.body,
      isArchived: false,
      start: currentTime,
      end: currentTime + tripLength,
      waypoints: []
    }
  }
  delete updatedRequest.body.id
  createTrip(updatedRequest, res)
}
