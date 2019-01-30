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
  },
  image: {
    type: String
  },
  inProgress: {
    type: Boolean,
    default: false
  },
  timeLimit: {
    type: Number
  },
  complete: {
    type: Boolean,
    default: false
  },
  waypoints: [{ type: ObjectId, ref: "Waypoint" }],
  tripPics: [{ type: String }]
}

const tripSchema = new mongoose.Schema(schema, { timestamps: true })

tripSchema.set("toJSON", {
  transform: function(doc, ret) {
    let retJson = {
      id: ret._id,
      userId: ret.userId,
      name: ret.name,
      lat: ret.lat,
      lon: ret.lon,
      start: ret.start,
      end: ret.end,
      image: ret.image,
      isArchived: ret.isArchived,
      inProgress: ret.inProgress,
      complete: ret.complete,
      timeLimit: ret.timeLimit,
      waypoints: ret.waypoints,
      tripPics: ret.tripPics
    }
    return retJson
  }
})

mongoose.set("useCreateIndex", true)
mongoose.set("useFindAndModify", false)
export const Trip = mongoose.model("Trip", tripSchema, "trips")
