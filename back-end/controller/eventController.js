import Event from '../models/eventModel.js'
import asyncHandler from 'express-async-handler'

// @desc   Create Event
// @Route  POST /api/events/create
// @access PRIVATE (ADMIN)
const createEvent = asyncHandler(async (req, res) => {
  const {
    name,
    city,
    venue,
    date,
    createdBy,
    registeredUsers,
    minimumScore,
    limit,
  } = req.body

  const existingEvent = await Event.findOne({ name: name })
  if (existingEvent) {
    res.status(400)
    throw new Error('Event with same name already exists')
  }

  const event = await Event.create({
    name,
    city,
    venue,
    date,
    createdBy,
    registeredUsers,
    minimumScore,
    limit,
  })

  res.status(201)
  res.json(event)
})

// @desc   Register for an event
// @Route  POST /api/events/register
// @access PRIVATE auth
const registerEvent = asyncHandler(async (req, res) => {
  const selectedEvent = await Event.findById(req.params.id)

  if (selectedEvent) {
    if (selectedEvent.registeredUsers.length === selectedEvent.limit) {
      res.status(400)
      throw new Error('Event is fully booked out!')
    }

    if (req.user.score < selectedEvent.minimumScore) {
      res.status(400)
      throw new Error('Your score does not meet the minimum criteria!')
    }

    selectedEvent.registeredUsers = [
      ...selectedEvent.registeredUsers,
      req.user._id,
    ]

    await selectedEvent.save()

    res.status(201)
    res.json({ message: 'Registered for this Event Successfully!' })
  } else {
    res.status(400)
    throw new Error('Event not found!')
  }
})

// @desc   Get all events
// @Route  GET /api/events/
// @access PRIVATE auth
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).populate('registeredUsers', 'name email')
  res.json(events)
})

// work in progress

// const getMyEvents = asyncHandler(async (req, res) => {
//   const events = await Event.find({ registerUsers: req.user._id })
// })

export { createEvent, registerEvent, getAllEvents }
