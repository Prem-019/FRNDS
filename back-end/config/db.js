import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.green.underline.bold
    )
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
