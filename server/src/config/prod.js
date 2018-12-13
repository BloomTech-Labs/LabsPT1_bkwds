export const config = {
  port: process.env.PORT,
  db: {
    url: process.env.MONGO_URI_PROD
  }
}
