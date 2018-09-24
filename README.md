## Notes API

- A server that will deliver notes can be found [here](url):

- A note has this basic format:

```js
  {
    "title": "Note Title",
    "content": "Note Content",
  }
```

- A note will also have an `id` property, but that will be automatically assigned by the server.

### url/notes

a `GET` request to this route will return a list of all the notes.

### url/notes/:id

a `GET` request to this route will return the note with the specified ID.

### url/notes

a `POST` request to this route with the title and text in the req.body will create a new note. The response from the server will be the ID of the new note.

### url/notes/:id

a `PUT` request to this route with the title and text in the req body will edit the note with the specified ID. The response from the server will be the updated note object.

### url/note/:id

a `DELETE` request to this route will delete the note with the specified ID.
