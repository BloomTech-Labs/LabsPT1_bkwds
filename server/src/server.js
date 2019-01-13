import { restRouter } from "./api"
import dotenv from "dotenv"
import express from "express"
import cors from "cors"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", restRouter)

app.get("/forgot_password", function(req, res) {
  res.send(
    '<form action="/passwordreset" method="POST">' +
      '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
      '<input type="submit" value="Reset Password" />' +
      "</form>"
  )
})

app.all("*", (req, res) => {
  res.json({
    ok: true
  })
})

export default app
