import express from 'express';

import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from '../controllers/usersControllers.js';

import {
  getOrders,
  createOrder,
  deleteOrder,
  updateOrder,
  getOrder,
} from '../controllers/ordersControllers.js';

import {userValidationRules, userValidationErrorHandling} from '../middleware/validation/userValidation.js'

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(
    userValidationRules(),
    userValidationErrorHandling,
    createUser
  );
router.route('/login').post(loginUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:id/orders')
  .get(getOrders)
  .post(createOrder);

router.route('/:id/orders/:orderId')
  .delete(deleteOrder)
  .put(updateOrder)
  .get(getOrder);

export default router;