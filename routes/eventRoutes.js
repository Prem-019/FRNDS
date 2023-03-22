import express from 'express'
import { protect, adminCheck } from '../middleware/authMiddleware.js'
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getMyEvents,
  registerEvent,
  updateEvent,
} from '../controller/eventController.js'

const router = express.Router()

router.route('/').get(protect, getAllEvents)
router
  .route('/:id')
  .put(protect, adminCheck, updateEvent)
  .delete(protect, adminCheck, deleteEvent)
router.route('/myEvents').get(protect, getMyEvents)
router.route('/create').post(protect, adminCheck, createEvent)
router.route('/register/:id').post(protect, registerEvent)

export default router
