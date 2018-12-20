export const config = {
  port: process.env.PORT || 5000,
  secrets: {
    JWT_SECRET: process.env.JWT_SECRET
  },
  db: {
    url: "mongodb://127.0.0.1/backwoods"
  }
}
