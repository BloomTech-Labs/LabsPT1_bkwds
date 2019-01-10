import request from "supertest"
import app from "../../src/server"

import { User } from "../../src/api/resources/user/user.model"

let token
let userID
const userOne = {
  username: "TestUser1",
  password: "testpass",
  email: "email@hotmail.com"
}
const userTwo = {
  username: "TestUser2",
  password: "testpass2",
  email: "email@gmail.com"
}
const userThree = {
  username: "TestUser3",
  password: "testpass3",
  email: "email@yahoo.com"
}

describe("Test User model and routes", () => {
  beforeAll(async done => {
    let user1 = new User(userOne)
    let user2 = new User(userTwo)
    await user1.save()
    await user2.save()
    const response = await request(app)
      .post("/api/login")
      .send({ username: user1.username, password: "testpass" })
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
      .send(userThree)
      .then(response => {
        expect(response.statusCode).toBe(201)
        expect(response.body.id).toBeTruthy()
        expect(response.body.username).toBe("TestUser3")
        expect(response.body.subscribed).toEqual(false)
        expect(response.body.email).toBe("email@yahoo.com")
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
        expect(response.body.id).toEqual(userID)
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
        expect(response.body.user.id).toEqual(userID)
        expect(response.body.user.username).toBe("TestUser1")
        expect(response.body.user.email).toBe("fakeEmail@gmail.com")
        expect(response.body.msg).toBe("User was deleted")
        done()
      })
  })
})
