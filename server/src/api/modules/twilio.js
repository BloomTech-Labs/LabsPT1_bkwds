import twilio from "twilio"
import { User } from "../resources/user/user.model"
import { Trip } from "../resources/trip/trip.model"
import config from "../../config"

const sid = config.twilio.sid
const token = config.twilio.token
const twilioNumber = config.twilio.number

export const sendSMSAlert = async (req, res) => {
  // data params:
  //  - user id
  //  - trip id
  const Twilio = twilio(sid, token)
  const data = await gatherResources(req.body)
  if (!data.timeLimit) {
    return res
      .status(500)
      .json("No time limit found. SMS alert will not be sent")
  }
  const message = `Alert!\n${
    data.user
  } has not completed their trip within their ${
    data.timeLimit
  } hour time limit.\nPlease attempt to contact contact them.\nLast known coordinates: ${
    data.lat
  }, ${data.lon}`

  // Return 202 response and start background task
  res.status(202).end("Safety alert timer started", async () => {
    await sleep(data.timeLimit) // sleep until time limit has expired
    try {
      const trip = await Trip.findOne({ _id: req.body.tripId }).populate(
        "waypoints"
      )
      const isComplete = areWaypointsComplete(trip.waypoints)
      if (isComplete) {
        console.log("Trip is complete")
        return // Trip was succesfully completed, return without sending alert
      }
      const response = await Twilio.messages.create({
        body: message,
        from: twilioNumber,
        to: data.number
      })
      console.log(`Twilio alert succesfully sent: ${response.sid}`)
    } catch (error) {
      console.log(error)
    }
  })
}

const gatherResources = async params => {
  const user = await User.findOne({ _id: params.userId })
  const trip = await Trip.findOne({ _id: params.tripId })
    .populate("waypoints")
    .exec()
  let location = findLastLocation(trip.waypoints)

  if (!location) {
    // If no waypoints are complete, then set location to be starting waypoint
    let waypoint = trip.waypoints[0]
    location = {
      lat: waypoint.lat,
      lon: waypoint.lon
    }
  }
  return {
    number: user.contact.number,
    name: user.contact.name,
    lat: location.lat,
    lon: location.lon,
    user: user.displayName,
    timeLimit: trip.timeLimit
  }
}

const findLastLocation = waypoints => {
  let filtered = waypoints.filter(waypoint => {
    if (waypoint.complete) return waypoint
  })
  let lastLocation = filtered.length - 1
  return filtered[lastLocation]
}

const sleep = hours => {
  let ms = hours * 3600000
  return new Promise(resolve => setTimeout(resolve, ms))
}

const areWaypointsComplete = waypoints => {
  let isComplete = true
  waypoints.forEach(waypoint => {
    if (waypoint.complete == false) isComplete = false
  })
  return isComplete
}
