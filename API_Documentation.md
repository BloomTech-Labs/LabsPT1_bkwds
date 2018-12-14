# API Documentation

## User

### /api/users

- Method: `GET`
- Response:
  - Status: `200`
  - Content: return an array of all existing users

### /api/users

- Method: `POST`
- Required Data Params:
  - username: `string`
  - password: `string`
  - email: `string`
- Response:
  - Status: `201`
  - Content: returns a newly created user object

### /api/users/:id

- Method: `DELETE`
- Required URL Param:
  - id: `integer`
- Response:
  - Status: `202`
  - Content: returns user object that was deleted

### /api/users/:id

- Method: `PUT`
- Required URL Param:
  - id: `integer`
- OPTIONS:
  - email: `string`
  - subscribed: `boolean`
  - sub_date: `Date`
- Response:
  - Status: `204`
  - Content: returns updated user object

### /api/users/:id/trips

- Method: `GET`
- Required URL Param:
  - id: `integer`
- Response:
  - Status: `200`
  - Content: returns all trips owned by specific user

---

## Trips
