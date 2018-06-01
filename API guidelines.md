## Basic guidelines for using Dalambdanotes API:

## Register and Login

POST request to "https://dalambdanotes.herokuapp.com/api/users/register" to create new account with username and password

POST request to "https://dalambdanotes.herokuapp.com/api/users/login" to login with username and password

## Accessing Your notes

access "https://dalambdanotes.herokuapp.com/api/notes" to view notes created on Your account

## Creating new notes

make a POST request to "https://dalambdanotes.herokuapp.com/api/notes" to create new note with "title" and "content". "tags" are optional.

## Edit and Delete note

make PUT request to "https://dalambdanotes.herokuapp.com/api/notes/:noteid" to edit title and / or content

make DELETE request to "https://dalambdanotes.herokuapp.com/api/notes/:noteid" to remove note

## Logging out

To log out and scrap Your session access "https://dalambdanotes.herokuapp.com/api/users/logout" via GET request
