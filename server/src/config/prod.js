export const config = {
  port: process.env.PORT,
  db: {
    url: process.env.MONGO_URI
  },
  stripe: {
    instance: require("stripe")(process.env.STRIPE_KEY_SERVER_PROD)
  }
}
