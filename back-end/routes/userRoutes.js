import express from 'express'
import { protect, adminCheck } from '../middleware/authMiddleware.js'
import {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  completeProfile,
} from '../controller/userController.js'

const router = express.Router()

router.route('/').get(protect, adminCheck, getAllUsers)
router.route('/register').post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/profile/complete').post(protect, completeProfile)
router
  .route('/:id')
  .get(protect, adminCheck, getUserById)
  .delete(protect, adminCheck, deleteUser)
  .put(protect, adminCheck, updateUser)

export default router
