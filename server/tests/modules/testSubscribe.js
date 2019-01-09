import request from "supertest"
import app from "../../src/server"

import { User } from "../../src/api/resources/user/user.model"

const freeUserData = {
  username: "FreeUser",
  password: "freeUserPass",
  email: "email@hotmail.com",
  subscribed: false,
  customerId: "",
  subscribeId: ""
}
const premiumUserData = {
  username: "PremiumUser",
  password: "premiumUserPass",
  email: "email@gmail.com",
  subscribed: true,
  customerId: "cus_testCustomer",
  subscribeId: "sub_"
}

describe("Test Subscribe and Cancel route", () => {
  let source
  let freeUserId
  let premiumUserId

  beforeAll(async done => {
    let freeUser = new User(freeUserData)
    let premiumUser = new User(premiumUserData)
    await freeUser.save()
    await premiumUser.save()
    const freeUserResponse = await request(app)
      .post("/api/login")
      .send({ username: freeUser.username, password: "freeUserPass" })
    freeUserId = freeUserResponse.body.user.id
    const premiumUserResponse = await request(app)
      .post("/api/login")
      .send({ username: premiumUser.username, password: "premiumUserPass" })
    premiumUserId = premiumUserResponse.body.user.id
    source = { source } = await stripe.createSource({ type: "card" })
    return done()
  })

  test("POST premium users cancel", done => {
    request(app)
      .post(`/api/subscribe/cancel/${premiumUserId}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.subscribed).toEqual(false)
        done()
      })
  })

  test("POST free users subscribe", done => {
    request(app)
      .post(`/api/subscribe/cancel/${freeUserId}`)
      .send({
        planId: process.env.STRIPE_PLAN_ID_TEST,
        source
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.subscribed).toEqual(true)
        done()
      })
  })
})
