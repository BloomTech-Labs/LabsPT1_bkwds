import express from 'express'
import cors from 'cors'
import { connect } from './db'
import { restRouter } from './api'

const app = express()
connect()

app.use(express.json())
app.use(cors())

app.use('/api', restRouter)

app.all('*', (req, res) => {
  res.json({
    ok: true
  })
})

export default app
