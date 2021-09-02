import createError from 'http-errors'
import User from '../models/User.js'


/* ----- CONTROLLERS ----- */


// GET all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort('lastname')
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
      id, req.body, { new: true }
    )
    if(!updatedUser) throw new createError(
      404,
      `No user with id: ${id} can be found.`
    )
    res.json({
      succes: `User with id: ${id} was updated.`
    })
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
    res.json({
      success: `User with id: ${id} was deleted.`
    })
  } catch (err) {
    next( err )
  }
}