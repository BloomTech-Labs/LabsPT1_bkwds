import request from "supertest"
import app from "../../src/server"

import * as mock from "../mock"

let userId
let token

describe("Test Subscribe and Cancel route", () => {
  beforeAll(async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: mock.userOne.username, password: "freeUserPass" })

    userId = response.body.user.id
    token = response.body.token
  })

  test("POST free users subscribe", async () => {
    const response = await request(app)
      .post(`/api/subscribe/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        planId: process.env.STRIPE_PLAN_ID_TEST,
        source: { id: "tok_visa" }
      })
    expect(response.statusCode).toBe(200)
    expect(response.body.subscribed).toEqual(true)
    expect(response.body.subscribeId).toBe.string
  })

  test("POST premium users cancel", async () => {
    const userResponse = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)

    if (userResponse && userResponse.body && userResponse.body.subscribeId) {
      const response = await request(app)
        .post(`/api/subscribe/cancel/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ subscribeId: userResponse.body.subscribeId })

      expect(response.statusCode).toBe(200)
      expect(response.body.subscribed).toEqual(false)
    }
  })
})
