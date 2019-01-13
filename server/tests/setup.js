import mongoose from "mongoose"
import dotenv from "dotenv"

import * as mock from "./mock"
import { User } from "../src/api/resources/user/user.model"
import { Waypoint } from "../src/api/resources/waypoint/waypoint.model"
import { Trip } from "../src/api/resources/trip/trip.model"

dotenv.config()
const options = {
  useNewUrlParser: true,
  reconnectTries: 1,
  reconnectInterval: 1000
}

beforeAll(async done => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      "mongodb://127.0.0.1/backwoods",
      options,
      err => {
        if (err) throw err
      }
    )
  }
  let user1 = new User(mock.userOne)
  let user2 = new User(mock.userTwo)

  let trip1 = new Trip(mock.tripOne)
  let trip2 = new Trip(mock.tripTwo)
  let way1 = new Waypoint(mock.waypointOne)
  let way2 = new Waypoint(mock.waypointTwo)
  let way4 = new Waypoint(mock.waypointFour)
  // Link user to trips
  user1.trips.push(trip1._id)
  user2.trips.push(trip2._id)
  trip1.userId = user1._id
  trip2.userId = user2._id

  // Link waypoints to trips
  trip1.waypoints = [way1._id, way2._id]
  way1.tripId = trip1._id
  way2.tripId = trip1._id
  way4.tripId = trip2._id

  await user1.save()
  await user2.save()
  await trip1.save()
  await trip2.save()

  await way1.save()
  await way2.save()
  await way4.save()

  return done()
})

afterAll(done => {
  const clearDB = () => {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteMany()
    }
    return done()
  }
  clearDB()
  mongoose.disconnect(done)
})
