import express from 'express'
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord
} from '../controllers/recordsControllers.js'


const router = express.Router()


router.route('/').get(getRecords).post(createRecord)
router.route('/:id').get(getRecord).patch(updateRecord).delete(deleteRecord)


export default router;