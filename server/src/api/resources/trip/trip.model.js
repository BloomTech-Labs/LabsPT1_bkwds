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
    type: boolean,
    default: false,
    required: [true]
  },
  start: {
    type: ISOdate,
    require: [true]
  },
  end: {
    type: ISOdate,
    require: [false]
  },
  lat: {
    type: decimal,
    require: [true]
  },
  lon: {
    type: decimal,
    require: [true]
  }
}

const tripSchema = new mongoose.Schema(schema, { timestamps: true })

export const Trip = mongoose.model("Trip", tripSchema, "trips")
