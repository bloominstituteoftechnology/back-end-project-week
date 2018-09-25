## Notes API

- A server that will deliver notes can be found [here](https://salty-cliffs-66443.herokuapp.com):

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

### url/notes/:id/tags

a `GET` request to this route will respond with an array of objects of the tags of the post.

### url/notes/:id/tags/

a `POST` request to this route with the tag in the req body will add a tag to the post.

### url/notes/:id/tags/:tagId

a `DELETE` request to this route will delete the tag from the post.

### url/login

a `POST` request to this route with the username and password in the req body will login the user.

- 200 when successful
- 422 if required username and password are not provided
- 404 when username does not exist
- 401 when password is incorrect

### url/register

a `POST` request to this route with the username and password in the req body will register the user.

- 201 when successful
- 422 if required username and password are not provided
- 409 when username already exists
