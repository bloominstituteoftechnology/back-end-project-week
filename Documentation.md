## Endpoints:

# Access
- POST 'auth/signup' if you have never signed up before and need to register your account information. Passwords are hashed before being stored. You will receive a json web token that will allow you to access note endpoints (must send your valid jwt back in an authorization header).
- POST 'auth/signin' if you have previously created an account with us to obtain a new valid web token for access to note endpoints (must send your valid jwt back in an authorization header).

#Notes
- GET '/notes/get/all': Returns all available notes.
- GET '/notes/get/:id': Returns the single note with the ID provided. 
- POST '/notes/create': Creates a new note. title and textBody are required elements when sending a post request.
- PUT '/notes/edit/:id': Edits an existing note. Please send the entire note, not just the part being edited.
- DELETE '/notes/delete/:id': Deletes the note with the ID provided. Cannot be undone.
