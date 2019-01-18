import request from "supertest"
import app from "../../src/server"

import * as mock from "../mock"

let token
let username

describe("Test Setting page", () => {
  beforeAll(async done => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: mock.userOne.username, password: "testpass" })
    username = mock.userOne.username
    token = response.body.token
    return done()
  })
  test("POST change password", done => {
    request(app)
      .get("/api/changePassword")
      .set("Authorization", `Bearer ${token}`)
      .send({ username, oldPassword: "testpass", newPassword: "newTestPass" })
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})
