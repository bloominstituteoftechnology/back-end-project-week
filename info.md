Trello board: https://trello.com/b/XlPt3r2a/lambda-notesbackend-cruise

Server hosted on Heroku
Client hosted on Firebase
Mongodb hosted on mlabs

Server documentation:
/api/users GET gets a list of all users
/api/users/:id GET DEL gets or deletes the given _id
/api/users/:id/notes GET Returns an array of notes for the given userid
/api/users/login POST for login
/api/users/register POST for register

/api/notes GET gets all notes for logged in user
/api/notes POST posts new note under logged in user
/api/notes/:id GET DEL PUT gets, deletes, or updates the notes for given _id

All routes except for login and register require server authentication via JWT.
