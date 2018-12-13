import mongoose from "mongoose"
const ObjectId = mongoose.Schema.Types.ObjectId

export const schema = {
  userId: {
    type: ObjectId,
    ref: "User",
    required: [true]
  },
  tripId: {
    type: ObjectId,
    ref: "Trip",
    required: [true]
  },
  waypointId: {
    type: String,
    ref: "Waypoint",
    required: [true]
  },
  status: {
    type: boolean,
    require: [true],
    default: false
  }
}

const progressSchema = new mongoose.Schema(schema, { timestamps: true })

export const Progress = mongoose.model("Progress", progressSchema, "progresses")
