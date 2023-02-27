import Event from '../models/eventModel.js'
import asyncHandler from 'express-async-handler'

// @desc   Create Event
// @Route  POST /api/events/create
// @access PRIVATE (ADMIN)
const createEvent = asyncHandler(async (req, res) => {
  const {
    name,
    city,
    details,
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
    details,
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
    if (!selectedEvent.isOpen) {
      res.status(400)
      throw new Error('Registration is closed!')
    }

    if (selectedEvent.registeredUsers.length === selectedEvent.limit) {
      res.status(400)
      throw new Error('Event is fully booked out!')
    }

    if (
      req.user.personality === null ||
      req.user.anxiety === 0 ||
      req.user.emotion === 0
    ) {
      res.status(400)
      throw new Error('Incomplete profile for registration')
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
// @Route  GET /api/events/:id
// @access PRIVATE Admin
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    event.name = req.body.name || event.name
    event.city = req.body.city || event.city
    event.venue = req.body.venue || event.venue
    event.details = req.body.details || event.details
    event.date = req.body.date || event.date
    event.createdBy = req.body.createdBy || event.createdBy
    event.registeredUsers = req.body.registeredUsers || event.registeredUsers
    event.minimumScore = req.body.minimumScore || event.minimumScore
    event.limit = req.body.limit || event.limit
    event.reward = req.body.reward || event.reward
    event.isOpen = req.body.isOpen || event.isOpen

    await event.save()
    res.status(200)
    res.json(event)
  } else {
    res.status(404)
    throw new Error('Event not found!')
  }
})

// @desc   Get all events
// @Route  GET /api/events/
// @access PRIVATE auth
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    await event.remove()

    res.json({ message: 'Event Deleted Successfully!' })
  } else {
    res.status(404)
    throw new Error()
  }
})

// @desc   Get all events
// @Route  GET /api/events/
// @access PRIVATE auth
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).populate('registeredUsers', 'name email')
  res.json(events)
})

// @desc   Get My events
// @Route  GET /api/events/my
// @access PRIVATE auth
const getMyEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ registeredUsers: { $in: [req.user._id] } })

  res.json(events)
})

export {
  createEvent,
  registerEvent,
  getAllEvents,
  getMyEvents,
  updateEvent,
  deleteEvent,
}
