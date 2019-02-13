export const config = {
  port: process.env.PORT || 5000,
  db: {
    url: "mongodb://127.0.0.1/backwoods"
  },
  stripe: {
    instance: require("stripe")(process.env.STRIPE_KEY_SERVER_TEST)
  }
}
