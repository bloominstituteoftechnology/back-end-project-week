# Back End Project Week

This week you will build a backend for a note taking app called "Lambda Notes".

You are to treat this week as if you are working at a company and the instructor is your client. The _Project Managers_ are acting as your company's project managers (duh!) and will be your main support throughout the week.

The main objective of this week is to develop a backend to support the LambdaNotes app you built during the Front End project week, connect the two projects together, and add some additional features. You will use `Node.js`, `Express` and any other technologies you have learned to complete this assignment.

## Notes API Docs (adapted from the front-end's docs)

- A server that will deliver notes can be found [here](https://notes-api-johnoro.herokuapp.com/):

- One thing to be aware of is that this server is a shared resource. Any notes you enter will be viewable to everyone who connects to the server.

- Examples will be using `axios` and updating `state` without more API requests excluding the last `PUT`.

- A note has this basic format:

```js
  {
    "title": "Note Title",
    "text": "Note Body",
    "created_at": "MM-DD-YY HH:MM:SS"
  }
```

### https://notes-api-johnoro.herokuapp.com/api/notes

- a `GET` request to this route will return a list of all the notes.
```js
  axios.get(URL)
    .then(({ data }) => {
      this.setState({
        notes: data
      });
    })
    .catch(err => console.error(err));
```

- a `POST` request to this route with the title and text in the req.body will create a new note. The response from the server will be the ID of the new note.
```js
  axios.post(URL, { title, text })
    .then(({ data }) => {
      this.setState({
        notes: [{
          id: data,
          title,
          text
        }, ...notes]
      });
    })
    .catch(err => console.error(err));
```

### https://notes-api-johnoro.herokuapp.com/api/notes/id

- a `GET` request to this route (with "id" replaced by the note ID) will return the note with the specified ID.
```js
  axios.get(URL)
    .then(({ data }) => {
      this.setState({
        note: data
      });
    })
    .catch(err => console.error(err));
```

- a `PUT` request to this route with the title and text in the req body will edit the note with the specified ID. The response from the server will be the count of updated records (1).
```js
  axios.put(`${URL}/${note.id}`, { title, text })
    .then(() => {
      this.setState({
        notes: notes.map(n => n.id === note.id ? {...n, title, text} : n)
      });
    })
    .catch(err => console.error(err));
```

- a `DELETE` request to this route will delete the note with the specified ID and will return the count of deleted records (1).
```js
  axios.delete(`${URL}/${note.id}`)
    .then(() => {
      this.setState({
        notes: notes.filter(n => n.id !== note.id)
      });
    })
    .catch(err => console.error(err));
```

### https://notes-api-johnoro.herokuapp.com/api/notes/id/id2

- a `PUT` request to this route with the ids of two notes will switch the notes' content and return the count of updated records (2).
```js
  axios.put(`${URL}/${id}/${id2}`)
    .then(() => {
      axios.get(URL)
        .then(({ data }) => {
          this.setState({ notes: data });
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
```

## Git Commits

You are required to showcase progress with at least 4 commits a day. This will let your project manager know where you are and if you need help. This also allows the client to get progress reports from the company in a real world setting. This also protects you from losing your work if your computer fails.

## Backend MVP Features:

### [Trello](https://trello.com/b/sgGWEZY9/backend-lambda-notes-by-john-orourke)

We recommend that you finish all the MVP features before trying to deploy.

- Add data persistenc using a Relational Database. We suggest you start with `SQLite3`.
- Create a Web API for the React application you built in the front-end project week.
- Build endpoints for each of the following features:
  - Display a list of notes.
  - Create a note with a _title_ and _content_.
  - View an existing note.
  - Edit an existing note.
  - Delete an existing note.
  - Modify your front-end so that it uses your newly created Web API.

Upon your first commit, please submit a Pull Request and add _both_ the **Trello Set Up** and **Backend MVP Features** Task lists to your first Pull Request comment.

---

**Once you have completed the "Minimum Viable Product" requirements, message your project manager for approval**. If approved, you may continue to deploy and work on the Extra Features. Please add the Extra Features you implement to the list you added to the comment on your first PR.

## Deployment

After your PM certifies that all MVP features are complente, it's time to work on deploying it online for the world to see. We recommend you deploy your server to [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction), and your front end to [netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/). Both services provide free tiers and easy to use interfaces.

Additionally, it is recommended that you keep your front end and backend codebases in separate GitHub repositories. This helps with deploying, since the different parts of your application will be deployed on different platforms.

## Extra Features:

Once your MVP has been approved, you have been given a feature list that the client would love to have completed. Your goal would be to finish MVP as soon as you can and get working the list of extra features.

- Setup Auto-Deploy on Heroku
- Provide documentation for how to interface with your api.
- Add pagination for long lists of notes.
- Create and display tags that can be added to notes and stored in the Database.
- Allow users to clone notes.
- Search functionality.
- Create a Registration Page that allows users to create accounts for your app and sign in with email/password.
- Allow users to sign in with a third party service (google, facebook, github, club penguin, etc...)
- Allow users to create Lists and assign notes to a list.
- Allow users to attach images to notes.
- Allow multiple users to collaborate on notes.
- Add Unit and Integration Tests.

## Super Duper Extra Credit Bonus Features

- Add a payment form integrating with _Stripe_ that allows Users to buy a _"Premium"_ version of Lambda Notes.
- Gate your favorite feature behind the _premium_ paywall

You will notice that this repository does not have any starter code. This is on purpose. You are to start from scratch using any files you have built throughout your time here at Lambda School as reference.
