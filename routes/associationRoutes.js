import express from 'express'
import { protect, adminCheck } from '../middleware/authMiddleware.js'
import {
  createAssociation,
  deleteAssociation,
  getAssociations,
  updateAssociation,
} from '../controller/associationController.js'

const router = express.Router()

router.route('/').get(protect, getAssociations)
router.route('/create').post(protect, adminCheck, createAssociation)
router.route('/update/:id').put(protect, adminCheck, updateAssociation)
router.route('/delete/:id').delete(protect, adminCheck, deleteAssociation)

export default router
