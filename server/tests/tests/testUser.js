import request from "supertest"
import app from "../../src/server"

import { User } from "../../src/api/resources/user/user.model"

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

describe("Test User model and routes", () => {
  beforeEach(done => {
    let newUser1 = new User(userOne)
    let newUser2 = new User(userTwo)
    newUser1.save()
    newUser2.save()
    return done()
  })
  test("GET all users", async () => {
    const response = await request(app).get("/api/users")
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toEqual(2)
  })
  test("POST create new user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send(userOne)
    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBeTruthy()
    expect(response.body.username).toBe("TestUser1")
    expect(response.body.password).toBe("testpass")
    expect(response.body.email).toBe("email@hotmail.com")
    expect(response.body.subscribed).toEqual(false)
    expect(response.body.trips).toEqual([])
  })
})
