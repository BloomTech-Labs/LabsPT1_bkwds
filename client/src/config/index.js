let serverUri, stripeKey

if (process.env.NODE_ENV === "production") {
  serverUri = "https://backwoods-tracker.herokuapp.com/api"
  stripeKey = process.env.STRIPE_KEY_CLIENT_PROD
} else {
  serverUri = "http://localhost:5000/api"
  stripeKey = process.env.STRIPE_KEY_CLIENT_TEST
}

export const SERVER_URI = serverUri
export const STRIPE_KEY = stripeKey
