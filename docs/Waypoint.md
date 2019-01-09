# Waypoint

## Get all waypoints

Get a list of all waypoints saved in the database

**URL**: `/api/waypoints/`

**Method**: `GET`

**Token required**: YES

### Success Response

**Status Code**: `200 OK`

**Example Content**

```
[
  {
    "id": "5c30307f86776e2c33bcceb3",
    "tripId": "5c302fbc9273842c0f7b1d30",
    "order": 1,
    "name": "Waypoint 1",
    "lat": {
      "$numberDecimal": "133.45"
    },
    "lon": {
      "$numberDecimal": "-22.21"
    },
    "start": "2019-01-09T03:11:35.863Z",
    "end": "2019-01-10T03:11:35.863Z",
    "complete": false
  },
  {
    "id": "5c30309786776e2c33bcceb4",
    "tripId": "5c302fbc9273842c0f7b1d30",
    "order": 2,
    "name": "Waypoint 2",
    "lat": {
      "$numberDecimal": "97.45"
    },
    "lon": {
      "$numberDecimal": "-12.21"
    },
    "start": "2019-01-09T03:11:35.864Z",
    "end": "2019-01-10T03:11:35.863Z",
    "complete": false
  }
]
```

---

## Create a new waypoint

Returns the created waypoint from database

**URL**: `/api/waypoints/`

**Method**: `POST`

**Token required**: YES

**Required Data Params**:

- **tripId** - `ObjectId`
- **order** - `Number`
- **name** - `String`
- **lat** - `Decimal128`
- **lon** - `Decimal128`
- **start** - `Date`
- **end** - `Date`

### Success Response

**Status Code**: `201 Created`

**Example Content**

```
{
  "id": "5c30307f86776e2c33bcceb3",
  "tripId": "5c302fbc9273842c0f7b1d30",
  "order": 1,
  "name": "Waypoint 1",
  "lat": {
    "$numberDecimal": "133.45"
  },
  "lon": {
    "$numberDecimal": "-22.21"
  },
  "start": "2019-01-09T03:11:35.863Z",
  "end": "2019-01-10T03:11:35.863Z",
  "complete": false
}
```

---

## Get a single waypoint

Returns a single waypoint from the database

**URL**: `/api/waypoints/:id`

**Method**: `GET`

**Token required**: YES

**Required URL Params**:

- **id** - `ObjectId`

### Success Response

**Status Code**: `200 OK`

**Example Content**

```
{
  "id": "5c30307f86776e2c33bcceb3",
  "tripId": "5c302fbc9273842c0f7b1d30",
  "order": 1,
  "name": "Waypoint 1",
  "lat": {
    "$numberDecimal": "133.45"
  },
  "lon": {
    "$numberDecimal": "-22.21"
  },
  "start": "2019-01-09T03:11:35.863Z",
  "end": "2019-01-10T03:11:35.863Z",
  "complete": false
}
```

---

## Update a waypoint

Returns the updated waypoint

```
Note: Certain properties are not allowed to be modifed.
  - tripId
```

**URL**: `/api/waypoints/:id`

**Method**: `PUT`

**Token required**: YES

**Required URL Params**:

- **id** - `ObjectId`

### Success Response

**Status Code**: `200 OK`

**Example Content**

```
{
  "id": "5c30307f86776e2c33bcceb3",
  "tripId": "5c302fbc9273842c0f7b1d30",
  "order": 1,
  "name": "Waypoint 1",
  "lat": {
    "$numberDecimal": "133.45"
  },
  "lon": {
    "$numberDecimal": "-22.21"
  },
  "start": "2019-01-09T03:11:35.863Z",
  "end": "2019-01-10T03:11:35.863Z",
  "complete": false
}
```

---

## Delete a waypoint

Returns the deleted waypoint and confirmation message

**URL**: `/api/waypoints/:id`

**Method**: `DELETE`

**Token required**: YES

**Required URL Params**:

- **id** - `ObjectId`

### Success Response

**Status Code**: `202 Accepted`

**Example Content**

```
{
  "waypoint": {
    "id": "5c30307f86776e2c33bcceb3",
    "tripId": "5c302fbc9273842c0f7b1d30",
    "order": 2,
    "name": "Waypoint 2",
    "lat": {
        "$numberDecimal": "133.45"
    },
    "lon": {
        "$numberDecimal": "-22.21"
    },
    "start": "2019-01-09T03:27:03.611Z",
    "end": "2019-01-10T03:11:35.863Z",
    "complete": false
  },
  "msg": "Waypoint was deleted"
}
```

---

## Get all waypoints for a trip

Returns an array of all waypoints for a trip

**URL**: `/api/waypoints/trip/:tripId`

**Method**: `GET`

**Token required**: YES

**Required URL Params**:

- **tripId** - `ObjectId`

### Success Response

**Status Code**: `200 OK`

**Example Content**

```
[
  {
    "id": "5c30309786776e2c33bcceb4",
    "tripId": "5c302fbc9273842c0f7b1d30",
    "order": 1,
    "name": "Waypoint 1",
    "lat": {
        "$numberDecimal": "97.45"
    },
    "lon": {
        "$numberDecimal": "-12.21"
    },
    "start": "2019-01-09T03:29:24.883Z",
    "end": "2019-01-10T03:11:35.863Z",
    "complete": false
  },
  {
    "id": "5c303134b099642dfdb189b4",
    "tripId": "5c302fbc9273842c0f7b1d30",
    "order": 2,
    "name": "Waypoint 2",
    "lat": {
      "$numberDecimal": "79.45"
    },
    "lon": {
      "$numberDecimal": "-122.21"
    },
    "start": "2019-01-09T03:29:24.884Z",
    "end": "2019-01-10T03:11:35.863Z",
    "complete": false
   }
]

```

---

## Delete all waypoints for a trip

Returns confirmation message with how many waypoints were deleted

**URL**: `/api/waypoints/trip/:tripId`

**Method**: `DELETE`

**Token required**: YES

**Required URL Params**:

- **tripId** - `ObjectId`

### Success Response

**Status Code**: `202 Accepted`

**Example Content**

```
"3 waypoints deleted"
```

---
