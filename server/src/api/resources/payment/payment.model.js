import mongoose from "mongoose"
const ObjectId = mongoose.Schema.Types.ObjectId

export const schema = {
  userId: {
    type: ObjectId,
    ref: "User"
  },
  planId: {
    type: string,
    default: 1
  }
}

const paymentSchema = new mongoose.Schema(schema, { timestamps: true })

export const Payment = mongoose.model("Payment", tripSchema, "payments")
