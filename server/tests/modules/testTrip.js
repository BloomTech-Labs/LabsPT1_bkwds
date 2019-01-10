import request from "supertest"
import app from "../../src/server"

import { Trip } from "../../src/api/resources/trip/trip.model"

const testTripOne = {
  name: testLocation1,
  start: 01 - 01 - 2018,
  end: 01 - 02 - 2018,
  lat: 45.354845,
  lon: 76.2542145
}
const testTripTwo = {
  name: testLocation2,
  start: 02 - 01 - 2018,
  end: 02 - 02 - 2018,
  lat: 65.354845,
  lon: 46.2542145
}
const testTripThree = {
  name: testLocation3,
  start: 03 - 01 - 2018,
  end: 03 - 02 - 2018,
  lat: 55.354845,
  lon: 36.2542145
}

describe("Test trip model and routes", () => {
  beforeAll(async done => {
    let trip1 = new Trip(testTripOne)
    let trip2 = new Trip(testTripTwo)
    await trip1.save()
    await trip2.save()
    const response = await request(app)
      .post("/api/login")
      .send({ username: user1.username, password: "testpass" })
    userID = response.body.user._id
    token = response.body.token
    return done()
  })
  test("GET all users", done => {
    request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toEqual(2)
        done()
      })
  })
  test("POST create new user", done => {
    request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send(userThree)
      .then(response => {
        expect(response.statusCode).toBe(201)
        expect(response.body._id).toBeTruthy()
        expect(response.body.username).toBe("TestUser3")
        expect(response.body.subscribed).toEqual(false)
        expect(response.body.email).toBe("email@yahoo.com")
        expect(response.body.trips).toEqual([])
        done()
      })
  })
  test("GET single user", done => {
    request(app)
      .get(`/api/users/${userID}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body._id).toEqual(userID)
        expect(response.body.username).toBe("TestUser1")
        done()
      })
  })
  test("PUT update a user", done => {
    const updated = { email: "fakeEmail@gmail.com" }
    request(app)
      .put(`/api/users/${userID}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updated)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body._id).toEqual(userID)
        expect(response.body.username).toBe("TestUser1")
        expect(response.body.email).toBe("fakeEmail@gmail.com")
        done()
      })
  })
  test("DELETE remove a user", done => {
    request(app)
      .delete(`/api/users/${userID}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(202)
        expect(response.body.user._id).toEqual(userID)
        expect(response.body.user.username).toBe("TestUser1")
        expect(response.body.user.email).toBe("fakeEmail@gmail.com")
        expect(response.body.msg).toBe("User was deleted")
        done()
      })
  })
})
