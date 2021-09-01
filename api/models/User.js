import mongoose from 'mongoose'
const { Schema, model } = mongoose


const UserSchema = new Schema({
  avatar: { type: String, default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Ffillies-small%2F64%2Fid-card-512.png&f=1&nofb=1'},
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user'}
},
{
  versionKey: false,
  timestamps: true
})


const User = model('User', UserSchema)

export default User