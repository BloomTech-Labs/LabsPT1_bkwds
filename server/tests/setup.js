import mongoose from "mongoose"

beforeEach(done => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      process.env.MONGO_URI,
      { useNewUrlParser: true },
      // "mongodb://localhost:27017/",
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
  return done()
})
