import request from "supertest"
import app from "../../src/server"

import { User } from "../../src/api/resources/user/user.model"
import { Waypoint } from "../../src/api/resources/waypoint/waypoint.model"

let waypointId
let tripId
let token
let date = new Date("March 18, 2019 11:30:00 AM")
let date2 = new Date("March 18, 2019 11:45:00 AM")
const userOne = {
  username: "TestUser1",
  password: "testpass",
  email: "email@hotmail.com"
}
const waypointOne = {
  tripId: "5a8d1cf5208ce33820f193bf",
  order: 1,
  name: "Checkpoint 1",
  lat: 30.508293960387878,
  lon: -97.77231216430664,
  start: Date.now(),
  end: date
}
const waypointTwo = {
  tripId: "5a8d1cf5208ce33820f193bf",
  order: 2,
  name: "Checkpoint 2",
  lat: 30.508293960387878,
  lon: -97.77231216430664,
  start: Date.now(),
  end: date2
}
const waypointThree = {
  tripId: "5a8d1cf5208ce33820f193bf",
  order: 3,
  name: "Checkpoint 3",
  lat: 30.508293960387878,
  lon: -97.77231216430664,
  start: Date.now(),
  end: date2
}
const waypointFour = {
  tripId: "5a8d1cf5103cd33820f193af",
  order: 1,
  name: "Checkpoint 1",
  lat: 24.208293960387878,
  lon: -101.45231216430664,
  start: Date.now(),
  end: date2
}

describe("Test Waypoint model and routes", () => {
  beforeAll(async done => {
    let user1 = new User(userOne)
    let way1 = new Waypoint(waypointOne)
    let way2 = new Waypoint(waypointTwo)
    let way4 = new Waypoint(waypointFour)

    await user1.save()
    await way1.save()
    await way2.save()
    await way4.save()
    const response = await request(app)
      .post("/api/login")
      .send({ username: user1.username, password: "testpass" })
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
        expect(response.body.tripId).toBe("5a8d1cf5208ce33820f193bf")
        expect(response.body.order).toBe(1)
        expect(response.body.lat.$numberDecimal).toBe("30.508293960387878")
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
        expect(response.body.lat.$numberDecimal).toBe("45.34")
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
        expect(response.body.waypoint.tripId).toBe("5a8d1cf5208ce33820f193bf")
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
