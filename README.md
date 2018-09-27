
### DOCUMENTATION ON NOTES API

# Introduction

The purpose of this API is to allow users to create, view, edit, and delete notes. Notes are automatically assigned an ID in the database, but require a title, content, and tags when created or edited. 

First fork, then clone repository. 
CD into your project directory, run ``` yarn ``` to load all dependencies, install nodemon as a development dependency if you do not have it already globally installed, and then start your server by running ``` yarn start ```.

Once the Notes API server is up and running, you can access the following endpoints. **

**NOTE: All endpoints are currently behind an authorization middleware that uses JSON Web Tokens to verify login on client side in localStorage. You can either setup client authentication and authorization using the login and register endpoints provided OR simply remove the ```protected``` middleware from each endpoint to access CRUD operations without authorization. 

# GET Endpoint to List of Notes

