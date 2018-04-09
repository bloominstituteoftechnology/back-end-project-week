# Pushing you Onward with your knowledge of Authentication.

* **DISCLAIMER** Authentication is a subject that many people spend a large amount time throughout their careers obtaining knowledge over. This is not something we expect you to have a mastery over, rather, we're preparing you to be able have an intelligent conversation about the subject.

![UnAuthorized](keep-calm-you-are-not-authorized.png)

* The objective of this challenge is to get you used to answering a few questions about Authentication.
* We also have some more reps for you to help hammer in the knowledge you've thus far learned.
* Answers to your written questions will be recorded in _Answers.md_
* This is to be worked on alone but you can use outside resources. You can _reference_ any old code you may have, and the React Documentation, however, please refrain from copying and pasting any of your answers. Try and understand the question and put your responses in your own words. Be as thorough as possible when explaining something.
* **Just a friendly Reminder** Don't fret or get anxious about this, this is a no-pressure assessment that is only going to help guide you here in the near future. This is NOT a pass/fail situation.

## Start by forking and cloning this repository.

## Questions - Self Study - You can exercise your Google-Fu for this and any other _Sprint Challenge_ in the future.

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
1.  What does bcrypt do in order to prevent attacks?
1.  What are the three parts of the JSON Web Token?

## Project Description - User Management System - Jokes On YoU!

* What we have here is a wise-guy application. _Dad jokes_ are all the rage these days.
* Our main problem with the application now is that we are trying to receive some mad dad jokes that are being requested from an external api, but we are locked out.
* Trust me, we all need these dad jokes in our lives.
* In order to be able to access our Killer Jokes you'll need to implement a User Authentication System that uses bcrypt and JWT.

## Initializing the Project

* `cd` into the root of the project and run `yarn install`.
* Once you have your `node_modules` go ahead and start your `mongod` server \* use either `mongod` `mongod --dbpath data` flag.
* Run `nodemon app.js` to start your node server.
* **TEST** this project using **`POSTMAN`**. Once you finish the project, you'll be tasked to set up `cors` properly for use with a client.

### Step 1: Implement your User Schema in `api/models/userModels.js`

* The required fields are `username` (must be unique and required) and `password`.

```
{
  "username": "Tony@stark.com",
  "password": "pepperpots"
}
```

* Next we'll use bcrypt to set up a `pre` hook on our `save` function for the UserSchema.
* This pre save hook will act as middleware to encrypt our users passwords.
* You can also take this time to set up a `checkPassword` method that can be used for comparing user passwords later on.

### Step 2: Implement your Create User Functionality in `api/controllers/user.js`

* Most of the heavy lifting will be taken care of in our pre save `middleware` that we've already implemented in our `userModel` file.
* Be sure to follow instructions on creating a user and you should be set
* **TEST** your `/api/user` _POST_ to ensure you can create a user with an encrypted password.
* Before moving on make sure you can create a user in the DB with an encrypted pw.

### Step 3: Users Gotta Login!

* This step will be real fun. Primarily because it's built out for you already! You're welcome!
* IF your `checkPassword` function is working properly, you should get back a token from the server.
* You'll need to handle this token appropriately in your next route.

### Step 4: _GET_ your Jokes!

* Grab your Token sent back to you in JWT format from _/login_.
* Send a `GET` request up to `/api/jokes` with the appropriate
* Without the appropriate request you'll get an error that looks like this from the `jwt` package

```
{
    "name": "JsonWebTokenError",
    "message": "invalid signature"
}
```

### Stretch Problem: Build a front end to interface with your User Auth System

* In order to play around with a client server app, you'll need to set up your `cors` inside of `server.js` properly.
* Using React and Redux and React Router, create a `Sign Up`, `Sign In` and `Jokes` page.
* Once you have the functionality down, you'll be able to style it up a bit and play around with the jokes etc.
