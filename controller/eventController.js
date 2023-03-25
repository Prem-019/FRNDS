import Event from '../models/eventModel.js'
import asyncHandler from 'express-async-handler'
import { sendMail } from '../mail/mail.js'

// @desc   Create Event
// @Route  POST /api/events/create
// @access PRIVATE (ADMIN)
const createEvent = asyncHandler(async (req, res) => {
  const {
    name,
    city,
    details,
    img,
    venue,
    date,
    registeredUsers,
    startTime,
    endTime,
    personality,
    emotion,
    anxiety,
    minimumScore,
    limit,
  } = req.body

  const createdBy = req.user._id

  const existingEvent = await Event.findOne({ name: name })
  if (existingEvent) {
    res.status(400)
    throw new Error('Event with same name already exists')
  }

  const event = await Event.create({
    name,
    city,
    details,
    img,
    venue,
    date,
    createdBy,
    registeredUsers,
    startTime,
    endTime,
    personality,
    emotion,
    anxiety,
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
    if (selectedEvent.registeredUsers.includes(req.user._id)) {
      res.status(403)
      throw new Error('Already Registered for this event!')
    }

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

    if (req.user.personality !== selectedEvent.personality) {
      res.status(400)
      throw new Error('Personality does not match')
    }

    // if (req.user.anxiety !== selectedEvent.anxiety) {
    //   res.status(400)
    //   throw new Error('Anxiety does not match')
    // }

    // if (req.user.emotion !== selectedEvent.emotion) {
    //   res.status(400)
    //   throw new Error('Emotion does not match')
    // }

    if (req.user.score < selectedEvent.minimumScore) {
      res.status(400)
      throw new Error('Your score does not meet the minimum criteria!')
    }

    selectedEvent.registeredUsers = [
      ...selectedEvent.registeredUsers,
      req.user._id,
    ]

    await selectedEvent.save()

    const otput = `
      <h1> ${selectedEvent.name} </h1>
      <h3>Event Id: ${selectedEvent._id}</h3>
      <h5> Date: ${new Date(selectedEvent.date)} </h5>
      <p> You are successfully registered for this event. We wish that you have a great experience. </p>
    `

    sendMail({
      to: req.user.email,
      output: otput,
      subject: 'Registration successful!',
    })

    res.status(201)
    res.json({ message: 'Registered for this Event Successfully!' })
  } else {
    res.status(400)
    throw new Error('Event not found!')
  }
})

// @desc   De-Register for an event
// @Route  POST /api/events/deregister
// @access PRIVATE auth
const deregisterEvent = asyncHandler(async (req, res) => {
  const selectedEvent = await Event.findById(req.params.id)

  if (selectedEvent) {
    if (selectedEvent.registeredUsers.includes(req.user._id)) {
      const updatedUsers = selectedEvent.registeredUsers.filter(
        (userId) => userId.toString() != req.user._id.toString()
      )

      selectedEvent.registeredUsers = updatedUsers
      await selectedEvent.save()

      const otput = `
      <h1> ${selectedEvent.name} </h1>
      <h3>Event Id: ${selectedEvent._id}</h3>
      <h5> Date: ${new Date(selectedEvent.date)} </h5>
      <p> You are successfully <b>De-registered</b> for this event.</p>
    `

      sendMail({
        to: req.user.email,
        output: otput,
        subject: 'De-Registration successful!',
      })

      res.status(201)
      res.json({ message: 'De-Registered for this Event Successfully!' })
    } else {
      res.status(400)
      throw new Error('User not registered or de-registered already')
    }
  } else {
    res.status(404)
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
    event.img = req.body.img || event.img
    event.details = req.body.details || event.details
    event.date = req.body.date || event.date
    event.createdBy = req.body.createdBy || event.createdBy
    event.registeredUsers = req.body.registeredUsers || event.registeredUsers
    event.minimumScore = req.body.minimumScore || event.minimumScore
    event.limit = req.body.limit || event.limit
    event.reward = req.body.reward || event.reward
    event.isOpen = req.body.isOpen || event.isOpen
    event.startTime = req.body.startTime || event.startTime
    event.endTime = req.body.endTime || event.endTime
    event.anxiety = req.body.anxiety || event.anxiety
    event.emotion = req.body.emotion || event.emotion
    event.personality = req.body.personality || event.personality

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
  const events = await Event.find({ city: req.query.city }).populate(
    'registeredUsers',
    'name email'
  )
  res.json(events)
})

// @desc   Get My events
// @Route  GET /api/events/my
// @access PRIVATE auth
const getMyEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({
    registeredUsers: { $in: [req.user._id] },
  }).populate('registeredUsers', 'name email')

  res.json(events)
})

export {
  createEvent,
  registerEvent,
  deregisterEvent,
  getAllEvents,
  getMyEvents,
  updateEvent,
  deleteEvent,
}
