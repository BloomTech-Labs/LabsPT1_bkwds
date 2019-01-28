## Get all users

Get a list of all users saved in the database

**URL**: `/api/users/`

**Method**: `GET`

**Token required**: YES

**Success Response**:

- **Status Code**: `200 OK`

**Example Content**

```
[
  {
    "coordinates": [
        30.2602426,
        -97.7387655
    ],
    "createdAt": "2019-01-24T04:32:45.319Z",
    "displayName": "Bobby B",
    "email": "bobbyB@blah.com",
    "formattedAddress": "Westeros",
    "id": "5c493fed143a401f908e2a7f",
    "lastLogin": "2019-01-24T15:00:50.228Z",
    "loginCount": 1,
    "subscribed": false,
    "trips": [
        "5c49fd00ab25a85e7a63a192",
        "5c4a00beab25a85e7a63a196",
        "5c4a3de0ab25a85e7a63a19a"
    ],
    "type": "email",
    "updatedAt": "2019-01-24T22:36:16.514Z",
    "contact": {
      "name": "Jane Doe",
      "number": "+15005559876"
    }
  },
  {
    "coordinates": [
        30.267153,
        -97.74306079999997
    ],
    "createdAt": "2019-01-24T19:15:45.365Z",
    "displayName": "Alex",
    "email": "blahbalhblah@gmail.com",
    "formattedAddress": "Austin, TX, USA",
    "id": "5c4a0ee1a44af818a3014fae",
    "lastLogin": "2019-01-24T19:33:40.341Z",
    "loginCount": 1,
    "subscribed": false,
    "trips": [
        "5c4a1055a44af818a3014faf"
    ],
    "type": "email",
    "updatedAt": "2019-01-24T19:33:40.343Z",
    "contact": {
      "name": "John Doe",
      "number": "+15005551234"
    }
  }
]
```

---

## Create a new user

Creates a new user in the database.

```
**Note**: Not for use by the frontend client. This route is for maintenance and testing purposes only. Use `/api/register` to create new users on frontend
```

**URL**: `/api/users/`

**Method**: `POST`

**Token required**: YES

**Required Data Params**:

- **password** - `string`
- **email** - `string`

**Success Response**:

- **Status Code**: `201 Created`

---

## Get a single user

Get a single user from the database

**URL**: `/api/users/:id`

**Method**: `GET`

**Token required**: YES

**Required URL Params**:

- **id** - `ObjectId`

**Success Response**:

- **Status Code**: `200 OK`

**Example Content**

```
{
  "coordinates": [
      30.267153,
      -97.74306079999997
  ],
  "createdAt": "2019-01-24T19:15:45.365Z",
  "displayName": "Alex",
  "email": "blablah@gmail.com",
  "formattedAddress": "Austin, TX, USA",
  "id": "5c4a0ee1a44af818a3014fae",
  "lastLogin": "2019-01-24T19:33:40.341Z",
  "loginCount": 1,
  "subscribed": false,
  "trips": [
    {
      "id": "5c4a1055a44af818a3014faf",
      "userId": "5c4a0ee1a44af818a3014fae",
      "name": "McKinney Hike",
      "lat": 30.183882319891016,
      "lon": -97.72374280468603,
      "start": "2019-01-24T18:00:00.000Z",
      "end": "2019-01-25T18:00:00.000Z",
      "image": "https://maps.googleapis.com/maps/api/staticmap?center=30.183882319891016,-97.72374280468603&zoom=15&size=380x350&key=",
      "isArchived": false,
      "inProgress": false,
      "waypoints": [
        "5c4a1055a44af818a3014fb0",
        "5c4a1055a44af818a3014fb1",
        "5c4a1055a44af818a3014fb2",
        "5c4a1055a44af818a3014fb3",
        "5c4a1055a44af818a3014fb4",
        "5c4a1055a44af818a3014fb5",
        "5c4a1055a44af818a3014fb6",
        "5c4a1055a44af818a3014fb7",
        "5c4a1055a44af818a3014fb8"
      ]
    }
  ],
  "type": "email",
  "updatedAt": "2019-01-24T19:33:40.343Z",
  "contact": {
      "name": "Jane Doe",
      "number": "+15005559876"
    }
}
```

---

## Update a single user

Returns an updated user from the database

```
Note: Certain properties are not allowed to be modifed.
  - username
  - password
  - trips
```

**URL**: `/api/users/:id`

**Method**: `PUT`

**Token required**: YES

**Required URL Params**:

- **id** - `ObjectId`

**Success Response**:

- **Status Code**: `200 OK`

**Example Content**

```
{
  "coordinates": [
      30.267153,
      -97.74306079999997
  ],
  "createdAt": "2019-01-24T19:15:45.365Z",
  "displayName": "Alex",
  "email": "blablah@gmail.com",
  "formattedAddress": "Austin, TX, USA",
  "id": "5c4a0ee1a44af818a3014fae",
  "lastLogin": "2019-01-24T19:33:40.341Z",
  "loginCount": 1,
  "subscribed": false,
  "trips": [
    {
      "id": "5c4a1055a44af818a3014faf",
      "userId": "5c4a0ee1a44af818a3014fae",
      "name": "McKinney Hike",
      "lat": 30.183882319891016,
      "lon": -97.72374280468603,
      "start": "2019-01-24T18:00:00.000Z",
      "end": "2019-01-25T18:00:00.000Z",
      "image": "https://maps.googleapis.com/maps/api/staticmap?center=30.183882319891016,-97.72374280468603&zoom=15&size=380x350&key=",
      "isArchived": false,
      "inProgress": false,
      "waypoints": [
        "5c4a1055a44af818a3014fb0",
        "5c4a1055a44af818a3014fb1",
        "5c4a1055a44af818a3014fb2",
        "5c4a1055a44af818a3014fb3",
        "5c4a1055a44af818a3014fb4",
        "5c4a1055a44af818a3014fb5",
        "5c4a1055a44af818a3014fb6",
        "5c4a1055a44af818a3014fb7",
        "5c4a1055a44af818a3014fb8"
      ]
    }
  ],
  "type": "email",
  "updatedAt": "2019-01-24T19:33:40.343Z",
  "contact": {
      "name": "Jane Doe",
      "number": "+15005559876"
    }
}
```

---

## Delete a single user

Returns the deleted user and a confirmation message

**URL**: `/api/users/:id`

**Method**: `DELETE`

**Token required**: YES

**Required URL Params**:

- **id** - `ObjectId`

**Success Response**:

- **Status Code**: `202 Accepted`

**Example Content**

```
{
  "user": {
    "coordinates": [
        30.267153,
        -97.74306079999997
    ],
    "createdAt": "2019-01-24T19:15:45.365Z",
    "displayName": "Alex",
    "email": "blahblah@gmail.com",
    "formattedAddress": "Austin, TX, USA",
    "id": "5c4a0ee1a44af818a3014fae",
    "lastLogin": "2019-01-24T19:33:40.341Z",
    "loginCount": 1,
    "subscribed": false,
    "trips": [
      "5c4a1055a44af818a3014faf"
    ],
    "type": "email",
    "updatedAt": "2019-01-24T23:40:33.008Z",
    "contact": {
      "name": "Bobby B",
      "number": "+15005551234"
    }
  },
  "msg": "User was deleted"
}
```

---

## Get a user's trips

Returns an array of all Trips associated with user

**URL**: `/api/users/:id/trips`

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
```

---
