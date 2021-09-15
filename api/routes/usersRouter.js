import express from 'express'
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} from '../controllers/usersControllers.js'
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} from '../controllers/ordersControllers.js'

const router = express.Router()

router.route('').get(getUsers).post(createUser)
router.route('/login').post(loginUser)

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
router.route('/:id/orders').get(getOrders).post(createOrder)
router.route('/:id/orders/:orderId').get(getOrder).patch(updateOrder).delete(deleteOrder)


export default router