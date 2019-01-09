import { Waypoint } from "./waypoint.model"

export const getAllWaypoints = (req, res) => {
  Waypoint.find({})
    .then(waypoints => {
      res.status(200).json(waypoints)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}
export const createWaypoint = (req, res) => {
  const newWaypoint = new Waypoint({
    tripId: req.body.tripId,
    order: req.body.order,
    name: req.body.name,
    lat: req.body.lat,
    lon: req.body.lon,
    start: req.body.start,
    end: req.body.end
  })
  newWaypoint
    .save()
    .then(waypoint => {
      res.status(201).json(waypoint)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
}

export const getWaypoint = (req, res) => {
  Waypoint.findOne({ _id: req.params.id })
    .then(waypoint => {
      res.status(200).json(waypoint)
    })
    .catch(err => {
      return res.status(500).send(err)
    })
}

export const updateWaypoint = (req, res) => {
  const id = req.params.id
  const update = req.body

  if (update.tripId) return res.status(401).send("TripId cannot be changed")

  Waypoint.findOneAndUpdate({ _id: id }, update)
    .then(oldWaypoint => {
      Waypoint.findOne({ _id: oldWaypoint.id })
        .then(newWaypoint => {
          res.status(200).json(newWaypoint)
        })
        .catch(() => {
          res.status(404).json("Waypoint Not Found")
        })
    })
    .catch(() => {
      res.status(404).json("Waypoint Not Found")
    })
}

export const deleteWaypoint = (req, res) => {
  Waypoint.findOneAndDelete({ _id: req.params.id })
    .then(waypoint => {
      if (!waypoint) return res.status(404).send("Waypoint Not Found")
      const payload = {
        waypoint,
        msg: "Waypoint was deleted"
      }
      res.status(202).json(payload)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const getWaypointsByTrip = (req, res) => {
  Waypoint.find({ tripId: req.params.tripId })
    .then(waypoints => {
      res.status(200).json(waypoints)
    })
    .catch(() => {
      res.status(404).json("No Waypoints found for specified Trip")
    })
}

export const deleteWaypointsByTrip = (req, res) => {
  Waypoint.deleteMany({ tripId: req.params.tripId })
    .then(response => {
      res.status(202).json(`${response.n} waypoints deleted`)
    })
    .catch(() => {
      res.status(404).json("No Waypoints found for specified Trip")
    })
}
