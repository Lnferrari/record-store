import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import bcrypt from 'bcryptjs'

const { Schema, model } = mongoose

const AddresSchema = new Schema({
  street: { type: String, required: true },
  streetNum: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true }
},
{
  _id: false
})

const UserSchema = new Schema({
  avatar: { type: String, default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Ffillies-small%2F64%2Fid-card-512.png&f=1&nofb=1'},
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: {
    type: String,
    // validate: {
    //   validator: async (v) => {
    //     const User = mongoose.model('User')
    //     const user = await User.findOne({ username: v})
    //     if (user) return false
    //     else return true
    //   },
    //   message: (props) => `${props.value} is already in use`
    // },
    required: true
    // unique: true
  },
  verified: {
    token: { type: String, required: true },
    status: { type: Boolean, default: false }
  },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user'},
  birthday: { type: Date, required: false },
  cart: [
    {
      record: {
        type: Schema.Types.ObjectId,
        ref: 'Record'
      },
      qty: { type: Number },
      _id: false
    }
  ],
  address: AddresSchema
},
{
  versionKey: false,
  timestamps: true,
  id: false,
  toJSON: {
    virtuals: true
  }
})


UserSchema.virtual('fullname').get(function() {
  return `${this.firstname} ${this.lastname}`
})

UserSchema.virtual('age').get(function() {
  if(this.birthday) {
    const milli = new Date() - this.birthday
    return Math.floor(milli / 31536000000)
  }
})

// pre save hook - will get triggered by these actions:
// - user.save()
// - User.create()
// - User.insertMany()
UserSchema.pre('findOneAndUpdate', function() {
  const user = this
  if(user.isModified('password')) {
    user.password = bcrypt.hashSync( user.password, 10 )
    console.log('updated hashed pw =>', user)
  }
})

UserSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  user.password = bcrypt.hashSync( user.password, 10 )
  console.log('saved user with hashed pw =>', user)
  next()
})

// schema.methods -> user
// schema.statics -> User

UserSchema.methods.generateAuthToken = function() {
  const user = this

  const token = jwt.sign({ _id: user._id}, config.secretKey , {expiresIn: '1d'})

  console.log(`We created a token for user ${user._id} => ${token}`);
  
  return token
}

UserSchema.methods.generateVerifToken = function() {
  const user = this

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    config.verifSecretKey,
    { expiresIn: '7d' }
  )

  console.log(`We created a token for user ${user._id} => ${token}`);
  
  return token
}

UserSchema.statics.findByToken = function (token) {
  const User = this;

  try {
    const decoded = jwt.verify( token, config.secretKey );

    return User.findOne({ _id: decoded._id })
  } catch (err) {
    return;
  }
}

const User = model('User', UserSchema)

export default User