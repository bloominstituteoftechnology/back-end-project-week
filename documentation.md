# Notes API <button name="button" onclick="http://localhost:5000/">See it in the browser!</button>

> This API provides a list of notes that a user can create for their personnel use.

<br>

### API Endpoints

*   Below are all of the available endpoints for this API:

<br>

| Type     |        Endpoint         | Description                                                                                                                              |
| -------- | :---------------------: | :--------------------------------------------------------------------------------------------------------------------------------------- |
| [POST]   |   `/api/user/create`    | Creates a new user in the database. Request body requires a unique user name and a password. Should give newly created user in response. |
| [DELETE] | `/api/user/destroy/:id` | Deletes a user from the database. Requires one parameter, the id. Should give message "{username} was removed from the DB`" in response. |
| [PUT]    |   `/api/user/update`    | Edits an existing user in the database. Should give edited user in response.                                                             |
| [GET]    |     `/api/user/get`     | Provides a list of all users in the database. Should give an array of users objects in response.                                         |

<br>

### [ POST ] method for creating a user

*   The `POST` method should take in an object that looks like this

<br>

```
{
  username: 'Bob1976',
  password: 'the is a fake password',
}
```

<br>

### [ POST ] method for creating a note

*   The `POST` method should take in an object that looks like this

<br>

```
{
  title: 'After School',
  body: 'Take Jimmy to his soccer game at 4pm ',
}
```

<br>

### User and Note Schemas

*   Below are the structure of the `Schemas`

<br>

```
<-- NOTES -->

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
      type: String,
      required: true
  }
});

<-- USER -->

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    passwordHashed: {
        type: String,
        required: true,
    },
});
```

<br>

## Referencing Issues and Pull Requests

*   Coming Soon

<br>

## License

*   Look at our LICENSE.md for more information. We used the standard MIT license for this project.

<br>

## Contributors

*   [Johnathan Huggett](https://www.github.com/JohnathanHuggett)
