# Lambda Notes Server

This is a RESTful API to connect the Lambda Notes Project by William Pelton.

## API Endpoints

| Type   | Path               | Data                         |
| ------ | ------------------ | ---------------------------- |
| GET    | /users/logout      | N/A                          |
| POST   | /users/login       | username, password           |
| POST   | /users/register    | username, password           |
| GET    | /notes/            | session cooke                |
| POST   | /notes/            | title, body                  |
| PUT    | /notes/:id         | note.\_id, title, body       |
| DELETE | /notes/:d          | note.\_id                    |

## Route Details

### Log-In

* [POST] request to `users/login` requires a username and a password.
  * Response will consist of `{ session cookie, username, notes }`

### Register New User

* [POST] request to `users/register` requires a username and a password.
  * Response will consist of `{ session cookie, username, notes }`

### Log-Out

* [GET] request to `users/logout` requires no data. Will log out the current user and destroy the active session.

### Note Manipulation

1.  [GET] request to `notes` requires active session from current active user to be present on `document.cookie`.

    * Will return user object with `{ _id, username, notes }`

2.  [POST] request to `notes` requires a title and active session. `{ session, title, body }`

    * Saves note to the database, and returns the newly saved note document.

3.  [PUT] request to `notes/:id` requires active session and `note._id`. `title` and `body` are optional.

    * Updates the note on the database and returns the updated note document.

4.  [DELETE] request to `notes/:id` requires active session on the body, and the `:id` param must be an active note.\_id.

    * Deletes the note from the database, and returns the quantity of deleted documents.

[trello](https://trello.com/b/x6M4nx60/lambda-notesbackend-william-pelton)
[front-end](https://romantic-mirzakhani-d12553.netlify.com/)
[back-end](https://quiet-fjord-20542.herokuapp.com/)
