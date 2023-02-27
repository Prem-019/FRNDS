import mongoose from 'mongoose'

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    date: {
      type: Date,
      required: true,
    },
    minimumScore: {
      type: Number,
      required: true,
      default: 0,
    },
    limit: {
      type: Number,
      required: true,
      default: 10,
    },
    isOpen: {
      type: Boolean,
      default: true,
      required: true,
    },
    reward: {
      type: Number,
      default: 0,
      required: true,
    },
    registeredUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Event = mongoose.model('event', eventSchema)

export default Event
