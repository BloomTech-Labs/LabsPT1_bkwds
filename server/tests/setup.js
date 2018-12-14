import mongoose from "mongoose"

beforeAll(done => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      // process.env.MONGO_URI,
      "mongodb://127.0.0.1/backwoods",
      { useNewUrlParser: true },
      err => {
        if (err) throw err
      }
    )
  }
  return done()
})
afterEach(done => {
  const clearDB = () => {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(() => {})
    }
    return done()
  }
  clearDB()
})

afterAll(done => {
  mongoose.disconnect(done)
  // return done()
})
