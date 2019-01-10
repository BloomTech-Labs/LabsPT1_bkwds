import request from "supertest"
import app from "../../src/server"

import { Trip } from "../../src/api/resources/trip/trip.model"

let date = new Date("March 18, 2019 11:30:00 AM")
let date2 = new Date("March 18, 2019 11:45:00 AM")
const userOne = {
  username: "TestUser1",
  password: "testpass",
  email: "email@hotmail.com"
}
const testTripOne = {
  name: testLocation1,
  start: 1547098098614,
  end: 1547098098914,
  lat: 45.354845,
  lon: 76.2542145
}
const testTripTwo = {
  name: testLocation2,
  start: 1547098098414,
  end: 15470980966,
  lat: 65.354845,
  lon: 46.2542145
}
const testTripThree = {
  name: testLocation3,
  start: 1547098098514,
  end: 1547098098914,
  lat: 55.354845,
  lon: 36.2542145
}

describe("Test Trip model and routes", () => {
  beforeAll(async done => {
    let user1 = new User(userOne)
    let trip1 = new Trip(testTripOne)
    let trip2 = new Trip(testTripTwo)
    let trip3 = new Trip(testTripThree)

    await user1.save()
    await trip1.save()
    await trip2.save()
    await trip3.save()
    const response = await request(app)
      .post("/api/login")
      .send({ username: user1.username, password: "testpass" })
    token = response.body.token
    return done()
  })
})
test("POST create new trip", done => {
  request(app)
    .post("/api/trips")
    .set("Authorization", `Bearer ${token}`)
    .send(testTripThree)
    .then(response => {
      expect(response.statusCode).toBe(201)
      expect(response.body.id).toBeTruthy()
      expect(response.body.lat).toBe(55.354845)
      expect(response.body.name).toEqual("testLocation3")
      done()
    })
})
