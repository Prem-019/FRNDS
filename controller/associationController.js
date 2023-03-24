import Association from '../models/associationModel.js'
import asyncHandler from 'express-async-handler'

// @desc   Create Association
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

// @desc   GET Association
// @Route  GET /api/associations/create
// @access PRIVATE (Auth)
const getAssociations = asyncHandler(async (req, res) => {
  const associations = await Association.find({ city: req.query.city })

  res.json(associations)
})

// @desc   PUT Association
// @Route  PUT /api/associations/update/:id
// @access PRIVATE (Admin)
const updateAssociation = asyncHandler(async (req, res) => {
  const association = await Association.findById(req.params.id)

  if (association) {
    const { name, city, email, website, country, contact, rating } = req.body

    association.name = name || association.name
    association.city = city || association.city
    association.email = email || association.email
    association.website = website || association.website
    association.country = country || association.country
    association.contact = contact || association.contact
    association.rating = rating || association.rating

    await association.save()

    res.status(201)
    res.json(association)
  } else {
    res.status(404)
    throw new Error('Association not found!')
  }
})

// @desc   DELETE Association
// @Route  DELETE /api/associations/delete/:id
// @access PRIVATE (Admin)
const deleteAssociation = asyncHandler(async (req, res) => {
  const assocation = await Association.findById(req.params.id)

  if (assocation) {
    await assocation.remove()

    res.status(201)
    res.json({ message: 'Association removed Successfully' })
  } else {
    res.status(404)
    throw new Error('Association not found!')
  }
})

export {
  createAssociation,
  getAssociations,
  updateAssociation,
  deleteAssociation,
}
