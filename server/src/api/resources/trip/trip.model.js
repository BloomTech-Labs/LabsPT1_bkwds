import mongoose from "mongoose"
const ObjectId = mongoose.Schema.Types.ObjectId

export const schema = {
  userId: {
    type: ObjectId,
    ref: "User",
    required: [true]
  },
  name: {
    type: String,
    required: [true, "name is required."]
  },
  isArchived: {
    type: Boolean,
    default: false,
    required: [true]
  },
  start: {
    type: Date,
    required: [true]
  },
  end: {
    type: Date,
    required: [false]
  },
  lat: {
    type: Number,
    required: [true]
  },
  lon: {
    type: Number,
    required: [true]
  }
}

const tripSchema = new mongoose.Schema(schema, { timestamps: true })

export const Trip = mongoose.model("Trip", tripSchema, "trips")
