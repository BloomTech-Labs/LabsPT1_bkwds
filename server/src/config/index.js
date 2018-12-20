import merge from "lodash.merge"

const env = process.env.NODE_ENV

const baseConfig = {
  port: process.env.PORT || 5000,
  secrets: {
    JWT_SECRET: null
  },
  db: {
    url: process.env.MONGO_URI
  },
  stripe: {
    instance: require("stripe")("sk_test_5twPX0XWUlzom0InGpSF2KhB")
  }
}

let envConfig = {}

switch (env) {
  case "development":
  case "dev":
    //envConfig = require("./dev").config
    break
  case "test":
  case "testing":
    envConfig = require("./testing").config
    break
  case "prod":
  case "production":
    envConfig = require("./prod").config
    break
  default:
  //envConfig = require("./dev").config
}

export default merge(baseConfig, envConfig)
