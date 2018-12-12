import mongoose from "mongoose"
import config from "./config"

mongoose.Promise = global.Promise
mongoose.set("useCreateIndex", true)

export const connect = () => {
  console.log("MONGO DB CONNECTED")
  return mongoose.connect(
    config.db.url,
    {
      useNewUrlParser: true
    }
  )
}
