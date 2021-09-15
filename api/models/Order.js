import mongoose from 'mongoose'
const { Schema, model } = mongoose


const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  records: [{
    record: {
      type: Schema.Types.ObjectId,
      ref: 'Record'
    },
    qty: {
      type: Number,
      required: true
    },
    _id: false
  }]
},
{
  versionKey: false,
  timestamps: true
})


const Order = model('Order', OrderSchema)

export default Order