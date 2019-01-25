import request from "supertest"
import app from "../../src/server"

import * as mock from "../mock"

let waypointId
let tripId
let token

describe("Test Waypoint model and routes", () => {
  beforeAll(async done => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: mock.userOne.email, password: "testpass" })
    token = response.body.token
    return done()
  })
  test("GET all waypoints", done => {
    request(app)
      .get("/api/waypoints")
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        waypointId = response.body[0].id
        tripId = response.body[0].tripId
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toEqual(3)
        done()
      })
  })
  test("POST create new waypoint", done => {
    const waypointThree = {
      tripId: tripId,
      order: 3,
      name: "Checkpoint 3",
      lat: 30.508293960387878,
      lon: -97.77231216430664,
      start: Date.now(),
      end: Date.now()
    }
    request(app)
      .post("/api/waypoints")
      .set("Authorization", `Bearer ${token}`)
      .send(waypointThree)
      .then(response => {
        expect(response.statusCode).toBe(201)
        expect(response.body.id).toBeTruthy()
        expect(response.body.order).toBe(3)
        expect(response.body.name).toEqual("Checkpoint 3")
        done()
      })
  })
  test("GET single waypoint", done => {
    request(app)
      .get(`/api/waypoints/${waypointId}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual(waypointId)
        expect(response.body.tripId).toBe(tripId)
        expect(response.body.order).toBe(1)
        expect(response.body.lat).toBe(30.508293960387878)
        done()
      })
  })
  test("GET all waypoints by Trip", done => {
    request(app)
      .get(`/api/waypoints/trip/${tripId}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toEqual(3)
        done()
      })
  })
  test("PUT update a waypoint", done => {
    const updated = { complete: true, lat: 45.34 }
    request(app)
      .put(`/api/waypoints/${waypointId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updated)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual(waypointId)
        expect(response.body.complete).toBe(true)
        expect(response.body.lat).toBe(45.34)
        done()
      })
  })
  test("DELETE remove a waypoint", done => {
    request(app)
      .delete(`/api/waypoints/${waypointId}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(202)
        expect(response.body.waypoint.id).toEqual(waypointId)
        expect(response.body.waypoint.name).toBe("Checkpoint 1")
        expect(response.body.waypoint.order).toBe(1)
        expect(response.body.waypoint.tripId).toBe(tripId)
        expect(response.body.msg).toBe("Waypoint was deleted")
        done()
      })
  })
  test("DELETE all waypoints by Trip", done => {
    request(app)
      .delete(`/api/waypoints/trip/${tripId}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(202)
        expect(response.body).toBe("2 waypoints deleted")
        done()
      })
    request(app)
      .get(`/api/waypoints/trip/${tripId}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toEqual(0)
      })
  })
})
