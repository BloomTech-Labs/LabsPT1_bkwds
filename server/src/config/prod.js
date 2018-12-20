export const config = {
  port: process.env.PORT,
  secrets: {
    JWT_SECRET: process.env.JWT_SECRET
  },
  db: {
    url: process.env.MONGO_URI
  }
}
