import createError from 'http-errors'
import Order from '../models/Order.js'


/* ----- CONTROLLERS ----- */


// GET all records
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      userId: req.params.id
    }).populate('records.record').populate('userId')
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

// GET order
export const getOrder = async (req, res, next) => {
  try {
    const { id, orderId } = req.params
    const order = await Order.findOne({
      userId: id,
      orderId: orderId
    })
    if (!order) res.json({
      error: `No order with id: ${orderId} can be found.`
    })
    res.json(order)
  } catch (err) {
    next(err)    
  }
}

// CREATE order
export const createOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    const populatedOrder = await Order.find({
      _id: newOrder._id
    }).populate('records.record').populate('userId')
    res.json(populatedOrder)
  } catch (err) {
    next(err)
  }
}

// // UPDATE order
export const updateOrder = async (req, res, next) => {
  try {
    // const {id, orderId} = req.params
    // const orderUpdated = await Order.findOneAndUpdate({
    //   userId: id, orderId: orderId,
    //   {new: true}
    // })
    // if (!orderUpdated) res.json({
    //   error: `No order with id ${id} can be found.`
    // })
    // res.json(orderUpdated)
  } catch (err) {
    next(err)
  }
}


// DELETE order
export const deleteOrder = async (req, res, next) => {
  try {
    const { id, orderId } = req.params
    const orderDeleted = await Order.findOneAndDelete({
      userId: id,
      orderId: orderId
    })
    if(!orderDeleted) throw new createError(
      404,
      `No order with id: ${orderId} can be found.`
    )
    res.json(orderDeleted)
  } catch (err) {
    next( err )
  }
}