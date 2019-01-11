## Register a new user

Registers and creates a new user in the database

**URL**: `/api/register/`

**Method**: `POST`

**Token required**: NO

**Success Response**:

- **Status Code**: `201 Created`

---

## Log in a user

Returns the logged in user and authorization token

**URL**: `/api/login/`

**Method**: `POST`

**Token required**: NO

**Success Response**:

- **Status Code**: `200 OK`

**Example Content**

```
{
  "user": {
    "id": "5c32a56f83d4a923130752b2",
    "username": "Diddy",
    "email": "test@gmail.com",
    "subscribed": false
  },
  "token": "e2JhbGciOgJIUzI1NiIsInR5dCI6IkpXVCJ9.eyJpZCI6IjVjMzJhNTZmODNkNGE5MjMxMzA#NTJihnIsImlhdCIhMTU0szAwNgUwNiwiZXhwIjoxNTQ3MDkxOTA2fQ.zb8M8jpVWDfxdK2Jum6iy-MCNQfyQNNaq_UpX3U5U6Q"
}
```

---
