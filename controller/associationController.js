import Association from '../models/associationModel.js'
import asyncHandler from 'express-async-handler'

// @desc   Create Event
// @Route  POST /api/associations/create
// @access PRIVATE (ADMIN)
const createAssociation = asyncHandler(async (req, res) => {
  const { name, city, email, website, country, contact, rating } = req.body

  const existingAssociation = await Association.findOne({ name: name })
  if (existingAssociation) {
    res.status(400)
    throw new Error('Association with same name already exists!')
  }

  const association = await Association.create({
    name,
    city,
    email,
    website,
    country,
    contact,
    rating,
  })

  res.status(201)
  res.json(association)
})

// @desc   GET Events
// @Route  GET /api/associations/create
// @access PRIVATE (Auth)
const getAssociations = asyncHandler(async (req, res) => {
  const associations = await Association.find({ city: req.query.city })

  res.json(associations)
})

export { createAssociation, getAssociations }
