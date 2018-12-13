import request from "supertest"
import app from "../src/server"
import mongoose from "mongoose"

describe("Test server root path", () => {
  afterAll(done => {
    mongoose.disconnect(done)
  })

  test("It should start and run without error", async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200)
  })
})
