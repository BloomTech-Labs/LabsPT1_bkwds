import { restRouter } from "./api"
import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", restRouter)

app.all("*", (req, res) => {
  res.json({
    ok: true
  })
})

export default app
