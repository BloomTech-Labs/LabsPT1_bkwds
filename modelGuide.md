# Models

### User
|          |        |          |          |
| -------- | ------ | -------- | --------------------------------------- |
| id       | string | auto     | unique id of each user                                              |
| type     | string | required | either `"authenticated"` or `"anonymous"`, default to `"anonymous"` |
| username | string | required | user name or email                                                  |
| password | string | required | user password                                                       |

### Trip
|            |                |          |                                  |
| ---------- | -------------- | -------- |------------------------------------ |
| id         | string         | auto     | unique id of each Trip                                                       |
| userId     | string         | required | reference id of the user who creates the trip                                |
| name       | string         | required | trip name                                                                    |
| isArchived | boolean        | required | indicate archived or unarchived trip, default to `False`                     |
| start      | ISOdate object | required | starting time and date of a trip, default to the moment this trip is created |
| end        | ISOdate object | optional | ending time and date of a trip  |   
| lat        | decimal | required | latitude of the center map of a trip  |   
| lon        | decimal | required | longitute of the center map of a trip  |   


### Waypoint
|        |         |          |                                                 |
| ------ | ------- | -------- | ----------------------------------------------- |
| id     | string  | auto     | unique id of each waypoint                      |
| tripId | string  | required | reference trip which this waypoint belongs to |
| order  | integer | required | order of waypoint in a trip                   |
| name   | string  | required | waypoint name                                 |
| lat    | decimal | required | latitude of waypoint location                 |
| lon    | decimal | required | longitute of waypoint location                |
| isCheckpoint | boolean | required | indicate a waypoint as a checkpoint (aka. marker), default to `false`

**Note**: decimal is avaiable in MongoDB 4.0

### Progress
|              |         |          |            |
| ------------ | ------- | -------- | ------------------------------------------------ |
| id           | string  | auto     | unique id of each combo `user-trip-checkpoint`        |
| userId       | string  | required | unique id of each user                           |
| tripId       | string  | required | unique id of each trip                           |
| waypointId | string  | required | unique id of each waypoint                     |
| status       | boolean | required | status of current waypoint, default to `False` |

### Payment
|        |        |          |                                                |
| ------ | ------ | -------- | ---------------------------------------------- |
| id     | string | auto     | unique id of each payment                      |
| userId | string | required | reference id of the user who makes the payment |
| planId | string | required | default to `"1"`                               |

# Example

## Get all trips
```
db.trip.find({})
```

## Get archived trips
```
db.trip.find({ isArchived: true })
```

## Get trips created by a specific user
```
db.trip.find({ userId: "89u6YpK31" })
```

## Create a new trip
```
db.trip.insertOne({
    userId: "89u6YpK31",
    name: "Moutain Aventure",
})
```
Override `state` and `end` default value
```
db.trip.insertOne({
    userId: "89u6YpK31",
    name: "Moutain Aventure",
    start: "2018-09-15T15:53:00",
    end: "2018-09-15T17:53:00"
})
```
**Note**: A trip can be created without any waypoint

## Create a waypoint
Create a waypoint
```
db.waypoint.insertOne({
    tripId: "o5wY1n04",
    order: 0,
    name: "Low Water Bridge Campsite",
    lat: 47.6119588,
    lon: -122.4000907,
})
```
Users could move faster if they bike instead of walk. Probably, we want to create multiple instead of single waypoints after certain amount of time
```
db.waypoint.insert([
    {
        tripId: "o5wY1n04",
        order: 0,
        name: "Low Water Bridge Campsite",
        lat: 47.6119588,
        lon: -122.4000907,
    },
    {
        tripId: "o5wY1n04",
        order: 1,
        name: "Low Water Bridge Campsite",
        lat: 47.6119700,
        lon: -122.4001840,
    },
])
```
Create a checkpoint
```
db.waypoint.insertOne({
    ...
    isCheckpoint: true,
    ...
})
```
## Archive a trip
```
db.trip.updateOne(
   { id: "o5wY1n04" },
   {
     $set: { isArchived: true }
   }
)
```

## Open a trip with current progress
Find the trip
```
db.trip.find(
   { id: "o5wY1n04" },
)
```
Find all checkpoints of the trip
```
db.waypoint.find(
   { tripId: "o5wY1n04" },
)
```
Find all checkpoints' status
```
db.progress.find(
    { userId: "89u6YpK31", tripId: "o5wY1n04" },
)
```
Find a specific checkpoint's status
```
db.progress.find(
    { userId: "89u6YpK31", tripId: "o5wY1n04", isCheckpoint: true, checkpointId: "2fCg5m77w" },
)
```

## Create or update trip progress
Update a specific checkpoint's status
```
db.progress.updateOne(
    { 
        userId: "89u6YpK31", 
        tripId: "o5wY1n04", 
        checkpointId: "2fCg5m77w", 
        order: 0,
        name: "Low Water Bridge Campsite",
        lat: 47.6119588,
        lon: -122.4000907,
    },
    $set: { status : true },
    { upsert: true } 
)
```
**Note**: if checkpoint is non-existent, this request will create a new row
