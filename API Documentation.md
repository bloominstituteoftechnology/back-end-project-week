This file is a documentation of how to use this API.

1. This project provide a server that create, read, update and delete (CRUD) a database which manages notes.

2. Each note has following properties  
    properties : id, title, textBody, created_at and updated_at.
   A simple entry of a note is as below
   {
   "id": 5,
   "title": "client add note",
   "textBody": "sample text box",
   "created_at": "2018-12-10 22:52:23",
   "updated_at": "2018-12-10 22:52:23"
   }

3. URL and spec for endpoints are below
   a. get all notes
   endpoint : api/notes
   operation : get
   require parameter : none

   b. get one note that match an ID
   endpoint : api/notes/:id
   operation : get
   require parameter : none

   c.add a note
   endpoint : api/addnote
   operation : post
   require parameter : note title and textBody should be sent in req.body

   d. edit a note
   endpoint : api/notes/:id
   operation : update
   require parameter : at least one of title or textBody should be in req.body

   d. delete a note
   endpoint : api/notes/:id
   operation : delete
   require parameter : none

   e. search note
   endpoint : api/search
   operation : get
   require parameter : query should be in req
