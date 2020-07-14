## Notes API

- A server that will deliver notes can be found [here](https://vellumnotes.herokuapp.com):

- One thing to be aware of is that this server is a shared resource. Any notes you enter will be viewable to everyone who connects to the server.

- A note has this basic format:

```js
  {
    "tags": ["tag", "otherTag"], // broken right now
    "title": "Note Title",
    "textBody": "Note Body",
  }
```

- There is also an "id" attribute, which is a number. It is automatically assigned by the server and will be returned as part of the data.

### https://vellumnotes.herokuapp.com/note/get/all

a `GET` request to this route will return a list of all the notes.

### https://vellumnotes.herokuapp.com/note/get/id

a `GET` request to this route (with "id" replaced by the note ID) will return the note with the specified ID.

### https://vellumnotes.herokuapp.com/note/create

a `POST` request to this route with the title and text in the req.body will create a new note. The response from the server will be the new note.

### https://vellumnotes.herokuapp.com/note/edit/id

a `PUT` request to this route with the title and text in the req body will edit the note with the specified ID. The response from the server will be the count of updated notes.

### https://vellumnotes.herokuapp.com/note/delete/id

a `DELETE` request to this route will delete the note with the specified ID.