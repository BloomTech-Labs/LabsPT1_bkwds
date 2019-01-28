export const config = {
  port: process.env.PORT || 5000,
  db: {
    url: "mongodb://127.0.0.1/backwoods"
  },
  stripe: {
    instance: require("stripe")(process.env.STRIPE_KEY_SERVER_TEST)
  },
  twilio: {
    // Test credentials given by Twilio API
    sid: "AC5cf333ff18d7b94390f3a663e931cda3",
    token: "ad7c1186d4991dffa8d5cca333f2ea8f",
    number: "+15005550006"
  }
}
