import mongoose from 'mongoose'
const { Schema, model } = mongoose


const UserSchema = new Schema({
  avatar: { type: String, default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Ffillies-small%2F64%2Fid-card-512.png&f=1&nofb=1'},
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user'},
  birthday: { type: Date }
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

const User = model('User', UserSchema)

export default User