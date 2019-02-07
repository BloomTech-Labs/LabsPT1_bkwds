import request from "supertest"
import app from "../../src/server"

import * as mock from "../mock"

let token
let userId
let tripId

describe("Test sending SMS alert with Twilio", () => {
  beforeAll(async done => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: mock.userOne.email, password: "testpass" })
    userId = response.body.user.id
    tripId = response.body.user.trips[0].id
    token = response.body.token
    return done()
  })
  test("Do not send alert if time limit is not set", done => {
    request(app)
      .post(`/api/send_sms`)
      .send({ userId, tripId })
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(500)
        expect(response.body).toBe(
          "No time limit found. SMS alert will not be sent"
        )
        done()
      })
  })
})
