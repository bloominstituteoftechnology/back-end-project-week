Auth Token payload

```
{
  username: 'username',
  id: 1,
  iat: '1538064624',
  exp: '1538151024',
  jti: '1234',
}
```

currently username and id are used in the backend and not decoded front end

Backend Endpoints

Auth

Register User
POST `/api/register`

Request body:

```
{
  email: 'user@user.com',
  password: 'password',
  username: 'username'
}
```

`email`: String, required, not currently checked for composition
`password`: string, required
`username`: string, required, case insensitive

Response:

```
{
  username: 'username',
  id: '1',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2VwaCIsImlkIjoxLCJpYXQiOjE1MzgwNjQ2MjQsImV4cCI6MTUzODE1MTAyNCwianRpIjoiMTIzNCJ9.O692LgjhwWxEP1M7WQIfnctb48pubLGUVLdY4kjQShQ'
}
```

Login User
POST `/api/login`
Request body:

```
{
  username: 'username',
  password: 'password'
}
```

`username`: string, required, case insensitive
`password`: string, required

Response:

```
{
  username: 'username',
  id: '1',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2VwaCIsImlkIjoxLCJpYXQiOjE1MzgwNjQ2MjQsImV4cCI6MTUzODE1MTAyNCwianRpIjoiMTIzNCJ9.O692LgjhwWxEP1M7WQIfnctb48pubLGUVLdY4kjQShQ'
}
```

Check Token
GET `/api/`
Requires jwt token, checks if token is valid and if so refreshes expiration, otherwise response with error

Get All Notes
GET `/api/notes`
Retrieves an array of all notes in db

response:

```
{
    [
      {
        id,
        title,
        content
        user_id
        username
      }
    ]
}
```

`id`: id of the note,
`title`, string, note title,
`content`, text, content of the note,
`user_id`, id of note author,
`username`, string, username of author

Get Note by Id
GET `/api/notes/:id`
Retrieves note with specified id
(currently unused on front end)

```
{
  id,
  title,
  content,
  user_id,
  username
}
```

Get all Notes by User
GET `/api/notes/user/:username`
Retrieves all notes written by selected username
(currently unused on front end)

```
{
  [
    {
      id,
      title,
      content,
      user_id
      username: ':username'
    }
  ]
}
```

Add Note
POST `/api/notes`
Requires Authentication
Adds a new note to database

Request body:

```
{
  title: 'title',
  content: 'content'
}
```

`title`: string, required
`content`: text, required

Returns:

```
{
  [
    {
      id,
      title,
      content,
      user_id,
      username
    }
  ]
}
```

Update a note
PUT `/api/notes/:id`
Requires Authorization
Updates a note in database if user_id of note with :id matches id of sent token

Request Body
```
{
  title,
  content
}
```

Returns all notes:

```
{
  [
    {
      id,
      title,
      content,
      user_id,
      username
    }
  ]
}
```
Delete a note
DELETE `/api/notes/:id`
Requires Authorization
Deletes a note in database if user_id of note with :id matches id of sent token

Returns all notes:

```
{
  [
    {
      id,
      title,
      content,
      user_id,
      username
    }
  ]
}
```
