import moment from "moment"
import { Trip } from "./trip.model"
import { User } from "../user/user.model"
import { Waypoint } from "../waypoint/waypoint.model"
import cloudinary from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
})

export const getAllTrips = (req, res) => {
  Trip.find({})
    .then(trips => {
      res.status(200).json(trips)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const createTrip = async (req, res) => {
  if (await notAllowedToCreateNewTrip(req.body.userId)) {
    return res.status(401).json("User has reached their monthly trip limit")
  }
  const newTrip = new Trip({
    userId: req.body.userId,
    name: req.body.name,
    isArchived: req.body.isArchived,
    start: req.body.start,
    end: req.body.end,
    lat: req.body.lat,
    lon: req.body.lon,
    image: req.body.image
  })
  newTrip
    .save()
    .then(trip => {
      User.p({ _id: req.body.userId }, { $addToSet: { trips: trip.id } })
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

export const updateTrip = async (req, res) => {
  const id = req.params.id
  const update = req.body

  if (update.waypoints)
    return res
      .status(401)
      .send(
        "Waypoints cannot be modified from Trip model. Use Waypoint model instead"
      )

  if ("isArchived" in update && "tempId" in update) {
    if (await notAllowedToArchiveTrip(update))
      return res.status(401).json("User has reached their archive limit of 50")
    delete update.tempId
  }

  Trip.findOneAndUpdate({ _id: id }, update)
    .then(oldTrip => {
      Trip.findOne({ _id: oldTrip.id })
        .populate("waypoints")
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
          User.findByIdAndUpdate(
            { _id: trip.userId },
            { $pull: { trips: trip.id } }
          )
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

export const uploadPics = ({ body, params }, res) => {
  const { id } = params
  const { image } = body

  if (image) {
    cloudinary.v2.uploader.upload(image, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ err, message: "Unable to process the image" })
      }
      Trip.findOneAndUpdate(
        { _id: id },
        { $push: { tripPics: result.url } },
        { returnOriginal: false }
      )
        .then(oldTrip => {
          Trip.findOne({ _id: oldTrip.id })
            .then(newTrip => res.status(200).json(newTrip))
            .catch(() => res.status(500).json(err))
        })
        .catch(() => res.status(500).json(err))
    })
  } else {
    res.status(422).send("Must include an image")
  }
}

const notAllowedToCreateNewTrip = async userId => {
  const user = await User.findOne({ _id: userId })
    .populate("trips")
    .exec()
  let trips = user.trips
  if (user.subscribed) return false
  if (trips.length <= 1) return false

  trips = trips.slice(-2)
  let dateOne = moment(trips[0].createdAt).format("LL")
  let dateTwo = moment(trips[1].createdAt).format("LL")
  let delta = moment()
    .subtract(30, "days")
    .format("LL")
  if (dateOne > delta && dateTwo > delta) {
    return true
  }
  return false
}

const notAllowedToArchiveTrip = async params => {
  if (!params.isArchived) return false // isArchive is false, User is trying to unarchive Trip
  const user = await User.findOne({ _id: params.tempId })
    .populate("trips")
    .exec()
  if (user.subscribed) return false
  let archivedTrips = user.trips.filter(trip => {
    if (trip.isArchived) return trip
  })
  if (archivedTrips >= 50) return true
  return false
}
