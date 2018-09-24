# Documentation of server's APIs

The server and database are designed to connect the Frontend of Lambda Note Project. The server supplies APIs for CRUD to modify the database when user interacts via Web Application.

## Setup

The server by default is running on port 3300 which can be modified in root's index.js

## APIs

There are 5 APIs in total:

### 1. Getting a list of notes from database
Method: `GET`

Route: `/notes`

Expected return: an `array` containing note `object`(s) with `title` and `textBody`

### 2. Getting a specific note from database
Method: `GET`

Route: `/notes/:id` (for example: `/notes/1`)

Expected return: a note `object` with `title` and `textBody`

### 3. Creating a note into database
Method: `POST`

Route: `/notes`

Expected return: `id` of newly created note

### 4. Updating an existing note in database
Method: `PUT`

Route: `/notes/:id`

Expected return: a message notifying the note with `id` is being updated successfully

### 5. Deleting an existing note in database
Method: `DELETE`

Route: `/notes/:id`

Expected return: a message notifying the note with `id` is being deleted successfully