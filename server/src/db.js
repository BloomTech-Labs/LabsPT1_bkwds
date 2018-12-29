import mongoose from "mongoose"
import config from "./config"

mongoose.Promise = global.Promise

export const connect = () => {
  return mongoose
    .connect(
      config.db.url,
      { userNewUrlParser: true }
    )
    .then(() => {
      console.log("MONGO DB CONNECTED")
    })
    .catch(err => {
      console.log(err)
      console.log(`Connection failed with config ${config.db.url}`)
    })
}
