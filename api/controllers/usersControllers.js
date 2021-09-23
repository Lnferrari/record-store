import createError from 'http-errors'
import User from '../models/User.js'


/* ----- CONTROLLERS ----- */


// GET all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('lastname').select('-password')
    res.json( users )
  } catch (err) {
    next( err )
  }
}

// GET user
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById( id ).select('-password')
    if(!user) throw new createError(
      404,
      `No user with id: ${id} can be found.`
    )
    res.json( user )
  } catch (err) {
    next( err )    
  }
}

// CREATE user
export const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create( req. body )
    res.json( newUser )
  } catch (err) {
    next( err )
  }
}

// UPDATE user
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).populate('cart.record')
    if(!updatedUser) throw new createError(
      404,
      `No user with id: ${id} can be found.`
    )
    res.json(updatedUser)
  } catch (err) {
    next( err )
  }
}

// DELETE user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete( id )
    if(!deletedUser) throw new createError(
      404,
      `No user with id: ${id} can be found.`
    )
    res.json(deletedUser)
  } catch (err) {
    next( err )
  }
}

// LOGIN user
export const loginUser = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({ email }).populate('cart.record')
    if (!user) throw new createError(404, `Email not valid`)
    if (user.password !== password) throw new createError(
      404,
      `Password not valid`
    )
    res.send(user)
  } catch (err) {
    next(err)
  }
}