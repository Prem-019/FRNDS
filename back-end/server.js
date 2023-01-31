import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.json('API is up and running...')
})

app.listen(
  process.env.PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
)
