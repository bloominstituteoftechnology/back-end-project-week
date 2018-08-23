# Lambda Notes API Reference

All request require a logged in user.

|     Endpoint     | Method |                       Example                        |    Sample Response    |                                      Description                                      |
| ---------------- | ------ | ---------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| */api/notes*     | GET    | http://lambda-notes-server.herokuapp.com/api/notes   | ``` block of code ``` | Fetches all notes in the database for the logged in user.                             |
| */api/notes*     | POST   | http://lambda-notes-server.herokuapp.com/api/notes   | ``` block of code ``` | Creates a new note to the database and returns all the notes for the logged in user.  |
| */api/notes/:id* | GET    | http://lambda-notes-server.herokuapp.com/api/notes/5 | ```block of code```   | Fetches a single note with the given ID for the logged in user.                       |
| */api/notes/:id* | PUT    | http://lambda-notes-server.herokuapp.com/api/notes/5 | ```block of code```   | Updates a single note with the given ID and returns all notes for the logged in user. |
| */api/notes/:id* | DELETE | http://lambda-notes-server.herokuapp.com/api/notes/5 | ```block of code```   | Deletes a single note with the given ID and returns all notes for the logged in user. |