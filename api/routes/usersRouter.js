import express from 'express';

import {
  getUser,
  getUsers,
  createUser,
  sendUser,
  updateUser,
  deleteUser,
  loginUser,
  verifyCookie
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
import sendEmail from '../middleware/mailer/setup.js'

const router = express.Router();

router.route('/')
  .get(auth, getUsers)
  .post(
    userValidationRules(),
    userValidationErrorHandling,
    createUser,
    sendEmail,
    sendUser
  );
router.route('/login').post(loginUser);

router.route('/auth').post(auth, verifyCookie)

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