import createError from 'http-errors'
import User from '../models/User.js'
import config from '../config/config.js'
import bcrypt from 'bcryptjs'


/* ----- CONTROLLERS ----- */


// GET all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('lastname')
    res.json( users )
  } catch (err) {
    next( err )
  }
}

// GET user
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById( id )
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
    newUser.password = undefined

    // Create a token for the user and inject it in the response
    const token = newUser.generateAuthToken()

    res
      .cookie('token', token, {
        expires: new Date(Date.now() + 172800000),
        sameSite: config.env === 'production' ? 'None' : 'lax',
        secure: config.env === 'production' ? true : false, // http on localhost, https on production
        httpOnly: true,
      })
      .send(newUser)
  } catch (err) {
    next( err )
  }
}

// UPDATE user
// it is not working when i need to update the password
export const updateUser = async (req, res, next) => {
  const { id } = req.params

  try {
    // this will not trigger the pre save hook. other than that it works fine
    // const updatedUser = await User.findByIdAndUpdate(
    //   id,
    //   req.body,
    //   { new: true }
    // ).populate('cart.record')

    // find the user first
    let user = await User.findById(id).populate('cart.record');
    // update the user fields
    Object.assign(user, req.body);
    const updatedUser = await user.save(); // => this will trigger the pre save hook

    if(!updatedUser) throw new createError(
      404,
      `No user with id: ${id} can be found.`
    )

    let newUser = await User.findById(updatedUser._id).populate('cart.record');

    if (!newUser) throw new createError(404, `No user with id:${id} was found.`);
    res.send(newUser);
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
    // if (user.password !== password) throw new createError(
    //   404,
    //   `Password not valid`
    // )

    const pwIsValid = bcrypt.compareSync(password, user.password)
    console.log('passwords matched => ', pwIsValid)
    if (!pwIsValid) next(createError(
      404,
      `Password is not valid`
    ))

    // Create a token for the user and inject it in the response
    const token = user.generateAuthToken()

    res
      .cookie('token', token, {
        expires: new Date(Date.now() + 172800000),
        sameSite: config.env === 'production' ? 'None' : 'lax',
        secure: config.env === 'production' ? true : false, // http on localhost, https on production
        httpOnly: true,
      })
      .send(user)
  } catch (err) {
    next(err)
  }
}

export const verifyCookie = (req, res, next) => {
  res.send( req.user )
}