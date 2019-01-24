import request from "supertest"
import app from "../../src/server"

import * as mock from "../mock"

let token
let email

describe("Test Setting page", () => {
  beforeAll(async done => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: mock.userOne.email, password: "testpass" })
    email = mock.userOne.email
    token = response.body.token
    return done()
  })
  test("POST change password", done => {
    request(app)
      .get("/api/changePassword")
      .set("Authorization", `Bearer ${token}`)
      .send({ email, oldPassword: "testpass", newPassword: "newTestPass" })
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})
