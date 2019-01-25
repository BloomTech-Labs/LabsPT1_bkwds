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
  //  - time specified by user
  const Twilio = twilio(sid, token)
  const data = await gatherResources(req.body)
  const message = `Alert!\n${
    data.user
  } has listed you as their emergency contact.\nIt's been 5 hours since ${
    data.user
  } last checked in.\nLast known coordinates: {${data.lat}, ${data.lon}}`

  await Twilio.messages
    .create({
      body: message,
      from: twilioNumber,
      to: data.number
    })
    .then(() => {
      res.status(200).json("SMS alert successfully sent")
    })
    .catch(() => {
      res.status(500).json("Error sending message")
    })
}

export const gatherResources = async params => {
  const user = await User.findOne({ _id: params.userId })
  const trip = await Trip.findOne({ _id: params.tripId }).populate({
    path: "waypoints",
    model: "Waypoint"
  })
  const waypoints = trip.waypoints.filter(waypoint => {
    if (waypoint.complete) return waypoint
  })
  const lastLocation = waypoints.length - 1
  return {
    number: user.contact.number,
    name: user.contact.name,
    lat: waypoints[lastLocation].lat,
    lon: waypoints[lastLocation].lon,
    user: user.displayName
  }
}
