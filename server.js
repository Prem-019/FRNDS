import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import serverless from 'serverless-http'

// ROUTING
import userRoutes from './routes/userRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import associationRoutes from './routes/associationRoutes.js'

// Custom error handling
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors'

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// user routes
app.use('/api/users', userRoutes)

// event routes
app.use('/api/events', eventRoutes)

// Association routes
app.use('/api/associations', associationRoutes)

// Custom middleware with ERROR handler
app.use(errorHandler)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.json('API is up and running...')
  })
}

app.listen(
  process.env.PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
)

const handler = serverless(app)

export default handler
