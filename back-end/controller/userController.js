import User from './../models/userModel.js'
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
        name: user.name,
        email: user.email,
        img: user.img,
        category: user.category,
        score: user.score,
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
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      img: user.img,
      category: user.category,
      score: user.score,
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
      name: user.name,
      email: user.email,
      img: user.img,
      category: user.category,
      score: user.score,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
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
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(201).json({
      _id: updatedUser._id,
      img: updatedUser.img,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isAccessAllowed: updatedUser.isAccessAllowed,
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
    user.isMainAdmin = req.body.isMainAdmin || user.isMainAdmin
    user.isAccessAllowed = req.body.isAccessAllowed

    const updatedUser = await user.save()

    res.status(201)
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isAccessAllowed: updatedUser.isAccessAllowed,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found!')
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
}
