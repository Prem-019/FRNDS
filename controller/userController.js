import User from './../models/userModel.js'
import Event from '../models/eventModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc   Auth USER & and get TOKEN
// @Route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user) {
    if (await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        img: user.img,
        name: user.name,
        email: user.email,
        gender: user.gender,
        country: user.country,
        age: user.age,
        interests: user.interests,
        phone: user.phone,
        category: user.category,
        userType: user.userType,
        personality: user.personality,
        anxiety: user.anxiety,
        emotion: user.emotion,
        score: user.score,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Incorrect Password!')
    }
  } else {
    res.status(401)
    throw new Error('No User Exists!')
  }
})

// @desc   Register New User
// @Route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, category } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User Already Exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    city,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      img: user.img,
      name: user.name,
      email: user.email,
      city: user.city,
      category: user.category,
      userType: user.userType,
      personality: user.personality,
      anxiety: user.anxiety,
      emotion: user.emotion,
      score: user.score,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// @desc   Get USER PROFILE
// @Route  GET /api/users/profile
// @access PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      img: user.img,
      name: user.name,
      email: user.email,
      gender: user.gender,
      country: user.country,
      age: user.age,
      interests: user.interests,
      phone: user.phone,
      category: user.category,
      userType: user.userType,
      personality: user.personality,
      anxiety: user.anxiety,
      emotion: user.emotion,
      score: user.score,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// @desc   Update USER PROFILE
// @Route  POST /api/users/profile/complete
// @access PRIVATE
const completeProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.personality = req.body.personality || user.personality
    user.anxiety = req.body.anxiety || user.anxiety
    user.emotion = req.body.emotion || user.emotion

    const updatedUser = await user.save()

    res.status(201).json({
      _id: updatedUser._id,
      img: updatedUser.img,
      name: updatedUser.name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      country: user.country,
      age: user.age,
      interests: user.interests,
      phone: user.phone,
      category: updatedUser.category,
      userType: updatedUser.userType,
      personality: updatedUser.personality,
      anxiety: updatedUser.anxiety,
      emotion: updatedUser.emotion,
      score: updatedUser.score,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

// @desc   Update USER PROFILE
// @Route  PUT /api/users/profile
// @access PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.img = req.body.img || user.img
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.category = req.body.category || user.category
    user.gender = req.body.gender || user.gender
    user.country = req.body.country || user.country
    user.phone = req.body.phone || user.phone
    user.interests = req.body.interests || user.interests
    user.age = req.body.age || user.gender
    user.personality = req.body.personality || user.personality
    user.anxiety = req.body.anxiety || user.anxiety
    user.emotion = req.body.emotion || user.emotion
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(201).json({
      _id: updatedUser._id,
      img: updatedUser.img,
      name: updatedUser.name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      country: user.country,
      interests: user.interests,
      phone: user.phone,
      age: user.age,
      category: updatedUser.category,
      userType: updatedUser.userType,
      personality: updatedUser.personality,
      anxiety: updatedUser.anxiety,
      emotion: updatedUser.emotion,
      score: updatedUser.score,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// @desc   Get All Users Profile
// @Route  GET /api/users/
// @access PRIVATE/ADMIN
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc   Delete User
// @Route  DELETE /api/users/
// @access PRIVATE/ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User Successfully Removed' })
  } else {
    res.status(404)
    throw new Error('User Not Found!')
  }
})

// @desc   Get User By ID
// @Route  GET /api/users/:id
// @access PRIVATE/ADMIN
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User Not Found!')
  }
})

// @desc   Update User By ID
// @Route  PUT /api/users/:id
// @access PRIVATE/ADMIN
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.img = req.body.img || user.img
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.gender = req.body.gender || user.gender
    user.interests = req.body.interests || user.interests
    user.country = req.body.country || user.country
    user.phone = req.body.phone || user.phone
    user.age = req.body.age || user.gender
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUser = await user.save()

    res.status(201)
    res.json({
      id: updatedUser._id,
      img: updatedUser.img,
      name: updatedUser.name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      interests: updatedUser.interests,
      phone: updatedUser.phone,
      category: updatedUser.category,
      userType: updatedUser.userType,
      personality: updatedUser.personality,
      anxiety: updatedUser.anxiety,
      emotion: updatedUser.emotion,
      score: updatedUser.score,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found!')
  }
})

const giveScore = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    const users = await User.updateMany(
      { _id: { $in: event.attendedUsers } },
      { $inc: { score: 5 } }
    )

    res.json({ message: 'Score given successfully' })
  } else {
    res.status(404)
    throw new Error('Event with the passed ID not found!')
  }
})

export {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  completeProfile,
  giveScore,
}
