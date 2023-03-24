import express from 'express'
import { protect, adminCheck } from '../middleware/authMiddleware.js'
import {
  createAssociation,
  getAssociations,
} from '../controller/associationController.js'

const router = express.Router()

router.route('/').get(protect, getAssociations)
router.route('/create').post(protect, adminCheck, createAssociation)

export default router
