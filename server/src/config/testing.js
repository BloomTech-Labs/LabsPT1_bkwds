export const config = {
  port: process.env.PORT || 5000,
  secrets: {
    JWT_SECRET: null
  },
  db: {
    url: process.env.MONGO_URI
  }
}
