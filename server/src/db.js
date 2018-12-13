import mongoose from "mongoose"
import config from "./config"

mongoose.Promise = global.Promise
mongoose.set("useCreateIndex", true)

const databaseURI = config.db.url ? config.db.url : "mongodb://localhost:27017/"

export const connect = () => {
  console.log("MONGO DB CONNECTED")
  return mongoose.connect(
    databaseURI,
    {
      useNewUrlParser: true
    }
  )
}
