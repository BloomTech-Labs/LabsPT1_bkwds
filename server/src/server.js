import express from 'express'

const app = express()

app.all('*', (req, res) => {
  res.json({ ok: true })
})

export default app

