import request from "supertest"
import app from "../../src/server"

import * as mock from "../mock"

let token
let userID

describe("Test User model and routes", () => {
  beforeAll(async done => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: mock.userOne.email, password: "testpass" })
    userID = response.body.user.id
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
      .send(mock.userThree)
      .then(response => {
        expect(response.statusCode).toBe(201)
        expect(response.body.id).toBeTruthy()
        expect(response.body.email).toBe("email@yahoo.com")
        expect(response.body.subscribed).toEqual(false)
        done()
      })
  })
  test("GET single user", done => {
    request(app)
      .get(`/api/users/${userID}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual(userID)
        expect(response.body.email).toBe("email@hotmail.com")
        done()
      })
  })
  test("PUT update a user", done => {
    const updated = { displayName: "Updated Display Name User 1" }
    request(app)
      .put(`/api/users/${userID}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updated)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual(userID)
        expect(response.body.displayName).toBe("Updated Display Name User 1")
        done()
      })
  })
  test("GET all trips from a user", done => {
    request(app)
      .get(`/api/users/${userID}/trips`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toEqual(3)
        expect(response.body[0].userId).toBe(userID)
        expect(response.body[0].name).toBe("tripOne")
        done()
      })
  })
  test("DELETE remove a user", done => {
    request(app)
      .delete(`/api/users/${userID}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(202)
        expect(response.body.user.id).toEqual(userID)
        expect(response.body.user.email).toBe("email@hotmail.com")
        expect(response.body.user.displayName).toBe(
          "Updated Display Name User 1"
        )
        expect(response.body.msg).toBe("User was deleted")
        done()
      })
  })
})
