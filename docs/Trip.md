## Get all trips

Get a list of all trips saved in the database

**URL**: `/api/trips/`

**Method**: `GET`

**Token required**: YES

**Success Response**:

- **Status Code**: `200 OK`

**Example Content**

```
[
  {
    "id": "5c36d200f9372c0371496eed",
    "userId": "5c1529fd5069560a28ffe082",
    "name": "TestTrip",
    "lat": 234.245,
    "lon": 123.34,
    "start": "2019-01-10T05:02:12.031Z",
    "end": "2019-01-10T05:02:12.031Z",
    "isArchived": false,
    "inProgress": false,
    "waypoints": [
        "5c36d200f9372c0371496eed",
        "5c36d200f9372c0371496eed",
        "5c36d200f9372c0371496eed",
        "5c36d200f9372c0371496eed"
    ]
  },
  {
    "id": "5c36dae34b41701a9cefc9b6",
    "userId": "5c1529fd5069560a28ffe082",
    "name": "TestTrip2",
    "lat": 234.245,
    "lon": 123.34,
    "start": "2019-01-10T05:02:12.031Z",
    "end": "2019-01-10T05:02:12.031Z",
    "isArchived": false,
    "inProgress": false,
    "waypoints": [
        "5c36dbd015b9491b9cbdae08",
        "5c36dce215b9491b9cbdae09",
        "5c36ddc415b9491b9cbdae0d",
        "5c36de6515b9491b9cbdae0e"
    ]
  }
]
]
```

---

## Create a new trip

Creates a new trip in the database.

**URL**: `/api/trips/`

**Method**: `POST`

**Token required**: YES

**Required Data Params**:

- **userId** - `ObjectId`
- **name** - `String`
- **isArchived** - `Boolean`
- **start** - `Date`
- **lat** - `Number`
- **lon** - `Number`

**Success Response**:

- **Status Code**: `201 Created`

**Example Content**

```
{
  "id": "5c37e722d2664c30b6a5bbea",
  "userId": "5c1529fd5069560a28ffe082",
  "name": "TestTrips",
  "lat": 21.245,
  "lon": 45.34,
  "start": "2019-01-10T05:02:12.041Z",
  "end": "2019-01-10T05:02:03.031Z",
  "isArchived": false,
  "inProgress": false,
  "waypoints": []
}
```

---

## Get a single trip

Get a single trip from the database

**URL**: `/api/trips/:id`

**Method**: `GET`

**Token required**: YES

**Required URL Params**:

- **id** - `ObjectId`

**Success Response**:

- **Status Code**: `200 OK`

**Example Content**

```
{
  "id": "5c37e56bd2664c30b6a5bbe2",
  "userId": "5c1529fd5069560a28ffe082",
  "name": "TestTrip",
  "lat": 234.245,
  "lon": 123.34,
  "start": "2019-01-10T05:02:12.031Z",
  "end": "2019-01-10T05:02:12.031Z",
  "isArchived": false,
  "inProgress": false,
  "waypoints": [
    {
      "id": "5c37e646d2664c30b6a5bbe7",
      "tripId": "5c37e56bd2664c30b6a5bbe2",
      "order": 1,
      "name": "CheckPoint1",
      "lat": {
        "$numberDecimal": "123.1"
      },
      "lon": {
        "$numberDecimal": "67"
      },
      "start": "2019-01-11T00:41:42.412Z",
      "end": "2019-01-10T05:02:12.031Z",
      "complete": false
    },
    {
      "id": "5c37e64dd2664c30b6a5bbe8",
      "tripId": "5c37e56bd2664c30b6a5bbe2",
      "order": 2,
      "name": "CheckPoint2",
      "lat": {
        "$numberDecimal": "123.1"
      },
      "lon": {
        "$numberDecimal": "67"
      },
      "start": "2019-01-11T00:41:49.192Z",
      "end": "2019-01-10T05:02:12.031Z",
      "complete": false
    }
  ]
}
```

---

## Update a single trip

Returns an updated trip from the database

```
Note: Certain properties are not allowed to be modifed.
  - waypoints
```

**URL**: `/api/trips/:id`

**Method**: `PUT`

**Token required**: YES

**Required URL Params**:

- **id** - `ObjectId`

**Success Response**:

- **Status Code**: `200 OK`

**Example Content**

```
{
  "id": "5c37e56bd2664c30b6a5bbe2",
  "userId": "5c1529fd5069560a28ffe082",
  "name": "TestTrip",
  "lat": 234.245,
  "lon": 123.34,
  "start": "2019-01-10T05:02:12.031Z",
  "end": "2019-01-10T05:02:12.031Z",
  "isArchived": false,
  "inProgress": true,
  "waypoints": [
    "5c37e646d2664c30b6a5bbe7",
    "5c37e64dd2664c30b6a5bbe8"
  ]
}
```

---

## Delete a single trip

Returns the deleted trip and a confirmation message

**URL**: `/api/trips/:id`

**Method**: `DELETE`

**Token required**: YES

**Required URL Params**:

- **id** - `ObjectId`

**Success Response**:

- **Status Code**: `202 Accepted`

**Example Content**

```
{
  "trip": {
    "id": "5c30376a4434b23013bdfe53",
    "userId": "5c2087a2906bf8871e6ceb87",
    "name": "TestTrip",
    "lat": 123,
    "lon": 2354,
    "start": "2019-01-01T00:00:00.000Z",
    "end": "2019-12-31T00:00:00.000Z",
    "isArchived": true,
    "inProgress": false,
    "waypoints": [
        "5c37e646d2664c30b6a5bbe7",
        "5c37e64dd2664c30b6a5bbe8"
    ]
  },
  "msg": "Trip was deleted"
}
```

---

## Get all waypoints for a trip

Returns all waypoints associated with that trip

**URL**: `/api/trips/:id/waypoints

**Method**: `GET`

**Token required**: YES

**Required URL Params**:

- **id** - `ObjectId`

**Success Response**:

- **Status Code**: `200 OK`

**Example Content**

```
[
  {
    "id": "5c37e841d2664c30b6a5bbeb",
    "tripId": "5c37e58bd2664c30b6a5bbe3",
    "order": 1,
    "name": "CheckPoint1",
    "lat": {
        "$numberDecimal": "123.1"
    },
    "lon": {
        "$numberDecimal": "67"
    },
    "start": "2019-01-11T00:50:09.222Z",
    "end": "2019-01-10T05:02:12.031Z",
    "complete": false
  },
  {
    "id": "5c37e847d2664c30b6a5bbec",
    "tripId": "5c37e58bd2664c30b6a5bbe3",
    "order": 2,
    "name": "CheckPoint2",
    "lat": {
        "$numberDecimal": "123.1"
    },
    "lon": {
        "$numberDecimal": "67"
    },
    "start": "2019-01-11T00:50:15.722Z",
    "end": "2019-01-10T05:02:12.031Z",
    "complete": false
  }
]
```

---
