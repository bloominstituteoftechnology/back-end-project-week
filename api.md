# Lambda Notes API Reference

All request require a logged in user.

|     Endpoint     | Method |                       Example                        |       Sample Response       |                                      Description                                      |
| ---------------- | ------ | ---------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------- |
| */api/notes*     | GET    | http://lambda-notes-server.herokuapp.com/api/notes   | ``` [{note01},{note02}] ``` | Fetches all notes in the database for the logged in user.                             |
| */api/notes*     | POST   | http://lambda-notes-server.herokuapp.com/api/notes   | ``` [{note01},{note02}] ``` | Creates a new note to the database and returns all the notes for the logged in user.  |
| */api/notes/:id* | GET    | http://lambda-notes-server.herokuapp.com/api/notes/5 | ``` {note}```               | Fetches a single note with the given ID for the logged in user.                       |
| */api/notes/:id* | PUT    | http://lambda-notes-server.herokuapp.com/api/notes/5 | ```[{note01},{note02}] ```  | Updates a single note with the given ID and returns all notes for the logged in user. |
| */api/notes/:id* | DELETE | http://lambda-notes-server.herokuapp.com/api/notes/5 | ```[{note01},{note02}] ```  | Deletes a single note with the given ID and returns all notes for the logged in user. |