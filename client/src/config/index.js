let serverUri

if (process.env.NODE_ENV === "production") {
  serverUri = "https://backwoods-tracker.herokuapp.com/api"
} else {
  serverUri = "http://localhost:5000/api"
}

export const SERVER_URI = serverUri
