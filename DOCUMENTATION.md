# Lambda Notes Server

This is a RESTful API to connect the Lambda Notes Project by AJ Genung to the Database hosted at mLabs.com.

## API Endpoints

| Type   | Path             | Data                         |
| ------ | ---------------- | ---------------------------- |
| GET    | /api/logout      | N/A                          |
| POST   | /api/login       | username, password           |
| POST   | /api/register    | username, password           |
| GET    | /api/getnotes    | JWT on headers.Authorization |
| POST   | /api/newnote     | title, body                  |
| PUT    | /api/updatenote  | note.\_id, title, body       |
| DELETE | /api/destroynote | note.\_id                    |

## Route Details

### Log-In

* [POST] request to `/api/login` requires a username and a password.
  * Response will consist of `{ JWT, username, notes }`

### Register New User

* [POST] request to `/api/register` requires a username and a password.
  * Response will consist of `{ JWT, username, notes }`

### Log-Out

* [GET] request to `/api/logout` requires no data. Will log out the current user and destroy the active JWT.

### Note Manipulation

1.  [GET] request to `/api/getnotes` requires active JWT from current active user to be present on `headers.Authorization`.

    * Will return user object with `{ _id, username, notes }`

2.  [POST] request to `/api/newnote` requires a title and active `JWT`. `body` is optional and will default to 'Default Entry' if not provided. `{ JWT, title, body }`

    * Saves note to the database, and returns an array of all notes from active user.

3.  [PUT] request to `/api/updatenote` requires active `JWT` and `note._id`. `title` and `body` are optional, but if your updating something, you should probably send at least one of these...

    * Updates the note on the database and returns an array of all notes from the active user.

4.  [DELETE] request to `/api/destroynote/:id` requires active `JWT` on the body, and the `:id` param must be an active note.\_id.

    * Deletes the note from the database, and returns an array of all the notes from the active user.

[trello](https://trello.com/b/7DBOIyKV/lambdanotes-backend-aj-genung)
