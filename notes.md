**2/12/19 notes**

Order: 

- Need to create a database and get it working in Postman before touching any of the front end. 

- Migrations: db needs to let you add notes. Notes have a `title` and some `content`. (Sure, make both `notNullable` while we're there.) Oh, and it'll need an `id`, obviously.
- Basically, need to have a lil CRUD app for your notes that you can play with in Postman.
- From there, I _think_ it'll just be swapping out the URLS in the Front-End Project Week repo to be my new `localhost` stuff?
- A stretch goal I'd really like to get to is just redoing the entire Front-End to make React less of a scary concept, but we'll... wait and see about that.

- Not sure how I ended up with two `node_modules`. :/

**2/13/19**

Ended up last night, improbably, with two `node modules` and two `package.json` files, which caused a bunch of errors. I tried to fix these with a new migration, which has the annoying effect that I now have to use `notes2` as my db home, which is frustrating and not DRY. 

More broadly, I'm kind of annoyed that I'm not better at debugging yet -- PM had a lot of good suggestions for getting to the bottom of my weird file-hierarchy problem from yesterday, but I wish I'd known about/thought to try those before throwing my arms up and asking for his help. I _guess_ this comes with time?

That aside, I'm pleased to have a CRUD app up and running. Sort of not looking forward to having to dive in and refactor old code. Really tempted to just build the damn thing from the beginning. Will ask PM his thoughts.

-- 

Talked to PM -- he wants me to make sure my Heroku stuff is working before redoing the front end from the ground up. Didn't ask him about timelines, but generally speaking, I think my Auth sprint (sucessfully wiring up my backend to my front end) plus successful Heroku deployment should _functionally_ count for like, 90% of the work of the back end sprint. 

Feeling pretty good, about to do the Heroku tutorial.