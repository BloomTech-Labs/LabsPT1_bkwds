import mongoose from "mongoose"

const options = {
  useNewUrlParser: true,
  reconnectTries: 1,
  reconnectInterval: 1000
}

beforeAll(done => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      "mongodb://127.0.0.1/backwoods",
      options,
      err => {
        if (err) throw err
      }
    )
  }
  return done()
})

afterAll(done => {
  const clearDB = () => {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteMany()
    }
    return done()
  }
  clearDB()
  mongoose.disconnect(done)
  // return done()
})
