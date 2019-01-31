import request from "supertest"
import app from "../../src/server"

let tripId

describe("Test public trip endpoints", () => {
  test("GET all public trips", done => {
    request(app)
      .get("/api/public/trips")
      .then(response => {
        tripId = response.body[1].id
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toEqual(2)
        return done()
      })
  })
  test("Get single public trip", done => {
    request(app)
      .get(`/api/public/trips/${tripId}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.isPublic).toBe(true)
        return done()
      })
  })
})
