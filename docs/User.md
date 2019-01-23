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
    "id": "5c1529fd5069560a28ffe082",
    "username": "tester11",
    "email": "tester11@gmail.com",
    "subscribed": false
  },
  {
    "id": "5c152aab31f556495097b93c",
    "username": "tester13",
    "email": "tester13@gmail.com",
    "subscribed": false
  },
  {
    "id": "5c153ac8ef78d128fa68dc4c",
    "username": "MegaMans",
    "email": "megazord28@gmail.com",
    "subscribed": false
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

- **username** - `string`
- **password** - `string`
- **email** - `string`

**Success Response**:

- **Status Code**: `201 Created`

**Example Content**

```
{
  "id": "5c1529fd5069560a28ffe082",
  "username": "tester11",
  "email": "tester11@gmail.com",
  "subscribed": false
}
```

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
  "id": "5c1529fd5069560a28ffe082",
  "username": "tester11",
  "email": "tester11@gmail.com",
  "subscribed": false
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
  "id": "5c1529fd5069560a28ffe082",
  "username": "tester11",
  "email": "tester11@gmail.com",
  "subscribed": false
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
    "id": "5c26edfec0bca3dc01855221",
    "username": "lkjsadfklj",
    "email": "lkj",
    "subscribed": false
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
