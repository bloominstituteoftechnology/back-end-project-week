API can be found at https://nameless-cliffs-24621.herokuapp.com/

How to use this API
GET /: sanity check, ensures the API is online. Returns { "api": "running" }.
GET api/users: returns all usernames and encrypted passwords
POST api/register: must have both a username and password. Creates a new user and returns a welcome message.
POST api/login: must have both a username and password. Returns a welcome message, JSON Web Token, and all of the user's notes.

All other routes are protected, the request must be sent with an Authentication header with valid JSON Web Token in order to get the expected data.
GET api/notes: returns all of the logged in user's notes.
GET api/notes/id: returns the note at the ID if the requested note belongs to the logged in user.
POST api/notes: must have both a title and content in order to be accepted. Returns the ID of the newly created note.
PUT api/notes/id: must have both a title and content in order to be accepted. Returns the number of notes edited.
DELETE api/notes/id: deletes the note at the ID. Returns the number of notes deleted.
