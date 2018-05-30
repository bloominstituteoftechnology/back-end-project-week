##Express Mongoose Store
express-mongoose is a MongoDB session store backed by [MongooseJS](http://mongoosejs.com/). It differs from other
MongoDB session stores because it accepts a current Mongoose connection, so you don't have to configure separate
connection for your session store if you are already using Mongoose for your backend. It is meant to give a MongoDB
session store with minimal config.

###express-mongoose only supports ````express > 4.0.0````

###Installation
````
$ npm install express-mongoose-store
````

###Options
```ttl``` - how long a session should last from last page view. Defaults to 1 day.
```cache_ttl``` - how long a session will be cached in memory

###Usage
````
var session        = require('express-session');
var mongoose       = require('mongoose');

mongoose.connect();

var MS             = require('express-mongoose-store')(session, mongoose);
app.use(session({ secret: 'keyboard cat', store: new MS({ttl: 600000}) }); //10 minute sessions
````

###Custom Model Name
By default the model name used for storing sessions is "sessions", however, you can customize this by
passing a modelName argument to the store like so:

````
app.use(session({ secret: 'keyboard cat', store: new MS({modelName: 'myApp_sessions' ttl: 600000}) });
````


Or if you want the session store to keep your Mongoose connection alive as well you can do the following:

````
var session        = require('express-session');
var mongoose       = require('mongoose');

mongoose.connect();

var MS             = require('express-mongoose-store')(session, mongoose);
var mongoose_store = new MS();

setInterval(function(){
  mongoose_store.keepAlive();
}, 20000);

app.use(session({ secret: 'keyboard cat', store: mongoose_store });
````

Essentially if your server has a lull in activity this protects your mongoose connection from timing out and having to reconnect, which in express can cause you to throw an error to a user.


###Test
Running tests requires a MongoDB instance running on 127.0.0.1:27017 with no authentication. It will also
delete anything in a database called "test" in the collection called "sessions" so if that is not desired, you
need to modify the tests or not run them.

````
npm install
npm test
````

###Change Log

#####v1.0.6 - Add memory caching to limit number of database queries

#####v1.0.5 - Fix for destroy callback

#####v1.0.4 - Bug fix

#####v1.0.3 - Session expiration with MongoDB expires via @rubenstolk

#####v1.0.2 - Configurable Model Name for Session via @rubenstolk
