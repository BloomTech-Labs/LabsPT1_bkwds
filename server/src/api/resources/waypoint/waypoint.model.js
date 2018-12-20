import mongoose from "mongoose"
const ObjectId = mongoose.Schema.Types.ObjectId

export const schema = {
  tripId: {
    type: ObjectId,
    ref: "Trip",
    required: [true]
  },
  order: {
    type: Integer,
    required: [true]
  },
  name: {
    type: String,
    unique: true,
    required: [true, "Name for waypoint required."]
  },
  lat: {
    type: decimal,
    require: [true]
  },
  lon: {
    type: decimal,
    require: [true]
  },
  isCheckpoint: {
    type: boolean,
    default: false,
    required: [true]
  }
}

const waypointSchema = new mongoose.Schema(schema, { timestamps: true })

export const Waypoint = mongoose.model("Waypoint", waypointSchema, "waypoints")
