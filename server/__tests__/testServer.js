import request from "supertest"
import app from "../src/server"

describe("Test server root path", () => {
  test("It should start and run without error", () => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
  })
})
