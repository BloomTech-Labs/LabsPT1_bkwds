import merge from "lodash.merge"

const env = process.env.NODE_ENV

const baseConfig = {
  port: process.env.PORT || 5000,
  secrets: {
    JWT_SECRET: process.env.JWT_SECRET
  },
  db: {
    url: process.env.MONGO_URI
  }
}

let envConfig = {}

switch (env) {
  case "development":
  case "dev":
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
}

export default merge(baseConfig, envConfig)
