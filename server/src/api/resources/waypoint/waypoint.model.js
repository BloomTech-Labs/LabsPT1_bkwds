import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Decimal128 = Schema.Types.Decimal128

export const schema = {
  tripId: {
    type: ObjectId,
    ref: "Trip",
    required: [true]
  },
  order: {
    type: Number,
    required: [true]
  },
  name: {
    type: String,
    required: [true, "Name for waypoint required."]
  },
  lat: {
    type: Number,
    require: [true]
  },
  lon: {
    type: Number,
    require: [true]
  },
  start: {
    type: Date,
    default: Date.now
  },
  end: {
    type: Date,
    required: [true, "End date and time required"]
  },
  complete: {
    type: Boolean,
    default: false
  }
}

const waypointSchema = new Schema(schema, { timestamps: true })

waypointSchema.set("toJSON", {
  transform: function(doc, ret) {
    let retJson = {
      id: ret._id,
      tripId: ret.tripId,
      order: ret.order,
      name: ret.name,
      lat: ret.lat,
      lon: ret.lon,
      start: ret.start,
      end: ret.end,
      complete: ret.complete
    }
    return retJson
  }
})

mongoose.set("useCreateIndex", true)
mongoose.set("useFindAndModify", false)
export const Waypoint = mongoose.model("Waypoint", waypointSchema, "waypoints")
