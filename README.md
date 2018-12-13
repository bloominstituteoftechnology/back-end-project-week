# Lambda Notes as undertaken by Edd Burke

This is a project I've undertaken under the Lambda School backend development cirriculum. I have taken our previous React front end project and implemented a custom RESTful API, resplendent with full CRUD capability, which will allow a user to interact with the notes application. The backend API is deployed to Heroku and the front end interface is hosted with Netlify.

## API Endpoints

The CRUD endpoints follow:

###CREATE
_POST_, in which we create a note
https://bummingsnotes.herokuapp.com/api/notes

###READ
_GET_, in which we display a note
https://bummingsnotes.herokuapp.com/api/notes

###UPDATE
_PUT_, in which we update a note
https://bummingsnotes.herokuapp.com/api/notes/:id

###DELETE
_DESTROY_, in which we delete a note
https://bummingsnotes.herokuapp.com/api/notes/:id

## Extra Features

This project has met full MVP qualifications and has met the stretch goals of:

- Setup API Auto-Deploy on Heroku
- Pagination for long lists of notes
