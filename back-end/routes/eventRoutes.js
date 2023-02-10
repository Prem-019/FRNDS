import express from 'express'
import { protect, adminCheck } from '../middleware/authMiddleware.js'
import {
  createEvent,
  getAllEvents,
  getMyEvents,
  registerEvent,
} from '../controller/eventController.js'

const router = express.Router()

router.route('/').get(protect, getAllEvents)
router.route('/myEvents').get(protect, getMyEvents)
router.route('/create').post(protect, adminCheck, createEvent)
router.route('/register/:id').post(protect, registerEvent)

export default router
