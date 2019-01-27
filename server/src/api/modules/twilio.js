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

  // PROBLEMS WITH THIS:
  //  TESTS WILL HANG WHILE WAITING FOR SLEEP
  //  IF TWILIO CALL FAILS CLIENT WILL NOT KNOW
  //  BECAUSE WE CANNOT RES AGAIN AFTER HEADERS HAVE BEEN SENT
  res.status(202).end("Safety alert timer started", async () => {
    await sleep(data.timeLimit)
    await Twilio.messages
      .create({
        body: message,
        from: twilioNumber,
        to: data.number
      })
      .then(() => {
        return
        console.log("SMS alert successfully sent")
      })
      .catch(() => {
        console.log("Error sending message")
      })
  })
}

const gatherResources = async params => {
  const user = await User.findOne({ _id: params.userId })
  const trip = await Trip.findOne({ _id: params.tripId }).populate({
    path: "waypoints",
    model: "Waypoint"
  })
  let location = await findLastLocation(trip.waypoints)

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
