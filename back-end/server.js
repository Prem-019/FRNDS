import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

// ROUTING
import userRoutes from './routes/userRoutes.js'

// Custom error handling
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json('API is up and running...')
})

app.use('/api/users', userRoutes)

// Custom middleware with ERROR handler
app.use(errorHandler)

app.listen(
  process.env.PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
)
