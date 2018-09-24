# How to interface with this web API

The web API is hosted on Heroku at [https://ghr-notes-back-end.herokuapp.com/](https://ghr-notes-back-end.herokuapp.com/). 

## Fetch all notes

Do a GET request to https://ghr-notes-back-end.herokuapp.com/note/get/all to fetch all of the notes.

## Fetch one note

Do a GET request to https://ghr-notes-back-end.herokuapp.com/note/get/id where id is a number to fetch one specific note.

## Create a note

Do a POST request to https://ghr-notes-back-end.herokuapp.com/note/create and pass in title, textBody, and tags.

## Edit a note

Do a PUT request to https://ghr-notes-back-end.herokuapp.com/edit/id where id is a number and pass in title, textBody, and/or tags.

## Delete a note

Do a DELETE request to https://ghr-notes-back-end.herokuapp.com/delete/id where id is a number.
