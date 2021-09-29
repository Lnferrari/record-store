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
import auth from '../middleware/authentication/authentication.js'

const router = express.Router();

router.route('/')
  .get(auth, getUsers)
  .post(
    userValidationRules(),
    userValidationErrorHandling,
    createUser
  );
router.route('/login').post(loginUser);

router.route('/:id')
  .get(auth, getUser)
  .patch(auth, updateUser)
  .delete(auth, deleteUser);

router.route('/:id/orders')
  .get(auth, getOrders)
  .post(auth, createOrder);

router.route('/:id/orders/:orderId')
  .delete(auth, deleteOrder)
  .put(auth, updateOrder)
  .get(auth, getOrder);

export default router;