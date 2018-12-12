# Deployment Notes

- You need a dynamic PORT in a .env file
- `package.json` needs this start script: 
    "start": "node index.js"
- Have a sanity check '/' endpoint
- Add postgress dependency 'pg'
- In Heroku Resources tab search for the Postgres add-on and provision it. 
- client 'pg', your 'connection' can be an object or a string 
- Connection needs: 'host', 'database', 'user', 'password'. We are using .env to keep it private. 
- Pool is for the # of connections (min and max). 
- Add the same migrations and seeds directory. 
- Setup server's db.Config.js file to use the DB environmental variable. Define this variable in Heroku (Config Vars) and set it to production.