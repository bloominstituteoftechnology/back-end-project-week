# Notes App v1.0.0

- [Auth](#auth) - [Logs an User In](#logs-an-user-in) - [Registers a New User](#registers-a-new-user)
- [Users](#users) - [Updates the Current Logged In User](#updates-the-current-logged-in-user) - [Deletes the Current Logged In User](#deletes-the-current-logged-in-user)
- [Notes](#notes) - [Deletes note based on provided Id](#deletes-note-based-on-provided-id) - [Returns all notes](#returns-all-notes) - [Add New note](#add-new-note) - [Updated note with provided Id](#updated-note-with-provided-id)

# Auth

## Logs a User In

<p>Logs a User In</p>

    POST /api/auth/login

### Parameters

| Name     | Type   | Description                 |
| -------- | ------ | --------------------------- |
| username | String | <p>Username of the User</p> |
| password | String | <p>Password of the User</p> |

### Success Response

Success-Response:

```
{
    "message": "Welcome Jason!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6ImtyeXN0YWwiLCJpYXQiOjE1ODU2OTE3ODUsImV4cCI6MTU4NjI5NjU4NX0.sTeWMY38y_zqW_NfI0Ae8sTQFjskStOPHJ4wNrre9m0"
}
```

### Error Response

Username-Not-Found-Response

```
{
     "message": "Invalid Credentials"
}
```

Incorrect-Password

```
{
     "message": "Invalid Credentials"
}
```

## Registers a New User

<p>Registers a New User</p>

    POST /api/auth/register

### Parameters

| Name     | Type   | Description                              |
| -------- | ------ | ---------------------------------------- |
| username | String | <p>The New Users username \*Required</p> |
| password | String | <p>The New Users password \*Required</p> |

### Success Response

Success-Response:

```
{
    "saved": {
        "id": 3,
        "username": "jason",
        "password": "$2a$10$nN1MqJAPV8a/jinHdYz2ee5yL39zIKlRcYv7RAiy/pcpF6oQ.d5jy",
        "role": "admin"
    }
}
```

# Users

## Updates the Current Logged In User

<p>Updates the current logged in user</p>

    PUT /api/user

### Parameters

| Name     | Type   | Description               |
| -------- | ------ | ------------------------- |
| username | String | <p>The Users username</p> |
| password | String | <p>The Users password</p> |

### Success Response

Success-Response:

```
{
 "id": 3,
 "username": "jason",
 "password": ,
 "role": "client"
}
```

### Error Response

Unauthorized-Response:

```
{
    "message": "No credentials provided"
}
```

## Deletes the Current Logged In User

<p>Deletes the current logged in user</p>

    DELETE /api/user

### Success Response

Success-Response:

```
1
```

### Error Response

Unauthorized-Response:

```
{
    "message": "No credentials provided"
}
```

# Notes

## Deletes Notes based on provided Id

    DELETE /api/notes/:id

### Parameters

| Name | Type    | Description                        |
| ---- | ------- | ---------------------------------- |
| id   | integer | <p>The ID is passed in the URL</p> |

## Returns all notes

    GET /api/notes

### Success Response

Success-Response:

```
{
        "id": 1,
        "title": "Note Title",
        "content": "This is your note",
    },
    ...
```

### Error Response

Unauthorized-Response:

```
{
    "message": "No credentials provided"
}
```

## Updated Note with provided Id

    PUT /api/notes/:id

### Parameters

| Name    | Type   | Description                     |
| ------- | ------ | ------------------------------- |
| title   | String | <p>Title of note \*Required</p> |
| content | String | <p>Content of note</p>          |

### Success Response

Success-Response:

### Error Response

Unauthorized-Response:

```
{
    "message": "No credentials provided"
}
```
