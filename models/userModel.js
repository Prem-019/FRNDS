import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
      default:
        'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png',
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: Number,
    },
    age: {
      type: Number,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      default: 'null',
    },
    interests: [{ type: String }],
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    userType: {
      type: String,
      required: true,
      enum: ['Admin', 'User', 'Doctor', 'Association'],
      default: 'User',
    },
    personality: {
      type: String,
      enum: ['Introvert', 'Extrovert', 'Ambivert', null],
      default: null,
    },
    anxiety: {
      type: Number,
      default: 0,
    },
    emotion: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('user', userSchema)

export default User