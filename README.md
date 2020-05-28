# Notes App v1.0.0

- [Auth](#auth) - [Logs an User In](#logs-an-user-in) - [Registers a New User](#registers-a-new-user)
- [Notes](#notes) - [Deletes note based on provided Id](#deletes-note-based-on-provided-id) - [Returns all notes](#returns-all-notes) - [Add New note](#add-new-class) - [Updated note with provided Id](#updated-note-with-provided-id)
- [Users](#users) - [Updates the Current Logged In User](#updates-the-current-logged-in-user) - [Deletes the Current Logged In User](#deletes-the-current-logged-in-user) - [Retrieve all notes that the Current User is testing for](#retrieve-all-categories-that-the-current-user-is-testing-for)

# Auth

## Logs an User In

<p>Logs an User In</p>

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

| Name     | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| username | String | <p>The New Users username \*Required</p>         |
| password | String | <p>The New Users password \*Required</p>         |
| role     | String | <p>The Users Role: admin, client, instructor</p> |

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

# Categories

## Deletes Category based on provided Id

    DELETE /api/categories/:id

### Parameters

| Name | Type    | Description                        |
| ---- | ------- | ---------------------------------- |
| id   | integer | <p>The ID is passed in the URL</p> |

## Returns all categories

    GET /api/categories

### Success Response

Success-Response:

```
{
        "note_id": 1,
        "note_front": "A",
        "note_back": "a",
        "category_id": 1,
        "category_name": "Alphabet",
        "category_description": "The letters A-Z uppercase and lowercase"
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

### Success Response

Success-Response:

```
{
        "id": 1,
        "name": "Alphabet",
        "frontCard": "A",
        "backCard": "a"
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

# notes

## Deletes notes based on provided Id

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
[
 {
    "id": 1,
    "frontCard": "A",
    "backCard": "a",
    "category_id": 1
}
...
]
```

### Error Response

Unauthorized-Response:

```
{
    "message": "No credentials provided"
}
```

## Add New Class

    POST /api/notes

### Parameters

| Name        | Type    | Description                                 |
| ----------- | ------- | ------------------------------------------- |
| frontCard   | String  | <p>Front of card information \*Required</p> | Back of card information |
| backCard    | String  | <p>The Id of the Instructor</p>             |
| category_id | Integer | <p>The Id of the Category \*Required</p>    |  |
|             |

### Success Response

Success-Response:

```
{
    "id": 1,
    "frontCard": "A",
    "backCard": "a",
    "category_id": 1
}
```

### Error Response

Unauthorized-Response:

```
{
    "message": "No credentials provided"
}
```

## Updated Class with provided Id

    PUT /api/notes/:id

### Parameters

| Name    | Type   | Description                     |
| ------- | ------ | ------------------------------- |
| title   | String | <p>Title of note \*Required</p> | Back of card information |
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

# User

## Updates the Current Logged In User

<p>Updates the current logged in user</p>

    PUT /api/user

### Parameters

| Name     | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| username | String | <p>The Users username</p>                        |
| password | String | <p>The Users password</p>                        |
| role     | String | <p>The Users Role, admin, instructor, client</p> |

### Success Response

Success-Response:

```
{
 "id": 3,
 "username": "don",
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
