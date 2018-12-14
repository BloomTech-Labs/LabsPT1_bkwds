import request from "supertest"
import app from "../../src/server"

// import { User } from "../../src/api/resources/user/user.model"

// const userOne = {
//   username: "TestUser1",
//   password: "testpass",
//   email: "email@hotmail.com"
// }
// const userTwo = {
//   username: "TestUser2",
//   password: "testpass2",
//   email: "email@gmail.com"
// }

describe("Test User model and routes", () => {
  //   beforeEach(done => {
  //     let newUser1 = new User(userOne)
  //     let newUser2 = new User(userTwo)
  //     newUser1.save()
  //     newUser2.save()
  //     return done()
  //   })
  //   test("GET all users", done => {
  //     let newUser1 = new User(userOne)
  //     let newUser2 = new User(userTwo)
  //     newUser1.save()
  //     newUser2.save()

  //     request(app)
  //       .get("/api/users")
  //       .then(response => {
  //         expect(response.statusCode).toBe(200)
  //         expect(response.body.length).toEqual(2)
  //         done()
  //       })
  //   })
  test("POST create new user", done => {
    request(app)
      .post("/api/users")
      .send(userOne)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body._id).toBeTruthy()
        expect(response.body.username).toBe("TestUser1")
        expect(response.body.subscribed).toEqual(false)
        expect(response.body.email).toBe("email@hotmail.com")
        expect(response.body.password).toBe("testpass")
        expect(response.body.trips).toEqual([])
        done()
      })
  })
})
