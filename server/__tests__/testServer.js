import request from "supertest"
import app from "../src/server"

describe("Test server root path", () => {
  test("It should start and run without error", async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200)
  })
})
