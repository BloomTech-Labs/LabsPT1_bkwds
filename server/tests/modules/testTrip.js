import request from "supertest"
import app from "../../src/server"

import * as mock from "../mock"

let token
let userId
let tripId
let trip

describe("Test Trip model and routes", () => {
  beforeAll(async done => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: mock.userOne.email, password: "testpass" })
    userId = response.body.user.id
    token = response.body.token
    return done()
  })
  test("GET all trips", done => {
    request(app)
      .get("/api/trips")
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        tripId = response.body[0].id
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toEqual(4)
        done()
      })
  })
  test("POST create new trip", done => {
    const tripThree = {
      userId: userId,
      name: "tripThree",
      start: Date.now(),
      end: Date.now(),
      lat: 12.21,
      lon: 45.234
    }
    request(app)
      .post("/api/trips")
      .set("Authorization", `Bearer ${token}`)
      .send(tripThree)
      .then(response => {
        expect(response.statusCode).toBe(201)
        expect(response.body.id).toBeTruthy()
        expect(response.body.name).toBe("tripThree")
        expect(response.body.userId).toBe(userId)
        done()
      })
  })
  test("GET single trip", done => {
    request(app)
      .get(`/api/trips/${tripId}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual(tripId)
        expect(response.body.name).toBe("tripOne")
        expect(response.body.waypoints.length).toEqual(2)
        done()
      })
  })
  test("PUT update a trip", done => {
    const updated = { inProgress: true }
    request(app)
      .put(`/api/trips/${tripId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updated)
      .then(response => {
        trip = response.body
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual(tripId)
        expect(response.body.name).toBe("tripOne")
        expect(response.body.inProgress).toBeTruthy()
        expect(response.body.waypoints.length).toEqual(2)
        done()
      })
  })
  test("POST repeat a trip", done => {
    request(app)
      .post(`/api/trips/repeat`)
      .set("Authorization", `Bearer ${token}`)
      .send(trip)
      .then(response => {
        expect(response.statusCode).toBe(201)
        expect(response.body.id).not.toEqual(trip.id)
        expect(response.body.start).not.toEqual(trip.start)
        expect(response.body.end).not.toEqual(trip.end)
        expect(response.body.waypoints.length).toEqual(0)
        done()
      })
  })
  test("DELETE remove a trip", done => {
    request(app)
      .delete(`/api/trips/${tripId}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(202)
        expect(response.body.trip.userId).toEqual(userId)
        expect(response.body.trip.name).toBe("tripOne")
        expect(response.body.msg).toBe("Trip was deleted")
        done()
      })
  })
})
