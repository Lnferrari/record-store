import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

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
    validate: {
      validator: async (v) => {
        const User = mongoose.model('User')
        const user = await User.findOne({ username: v})
        if (user) return false
        else return true
      },
      message: (props) => `${props.value} is already in use`
    },
    required: true
    // unique: true
  },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user'},
  birthday: { type: Date },
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
  address: { type: AddresSchema, required: true }
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

UserSchema.methods.generateAuthToken = function() {
  const user = this

  const token = jwt.sign({ _id: user._id}, 'i-am-a-very-secret-string', {expiresIn: '1d'})

  console.log('user token =>', token)
  return token
}

const User = model('User', UserSchema)

export default User