import { restRouter } from "./api"
import dotenv from "dotenv"
import express from "express"
import cors from "cors"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.use("/api", restRouter)

app.all("*", (req, res) => {
  res.json({
    ok: true
  })
})

export default app
