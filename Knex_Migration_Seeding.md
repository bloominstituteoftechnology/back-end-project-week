# Migrations & Seeding

## What are migrations??

Migrations are a way to make database changes or updates, like creating or dropping tables, as well as updating a table with new columns with constraints via generated scripts. We can build these scripts via the command line using `knex` command line tool.

To learn more about migrations, check out [this](https://www.openscg.com/2017/08/what-is-a-database-migration/) article on the different types of database migrations!

### Creating/Dropping Tables

Let's create a `Users` and `Tasks` table using the `knex` command line tool. In the root of our project run the following commands:

```bash
$ knex migrate:make create_users_table
$ knex migrate:make create_tasks_table
```

The above commands will generate migration scripts in `./db/migrations` with the given name plus a timestamp. (i.e. 20171024191043_create_user.js). This is on purpose so that knex can run the older migration files first, and then the newer ones that build on top of them.

The content of these files will stub out empty `up` and `down` functions to create or drop tables or columns.

We now want to build out the `users` and `tasks` table using some of the built in knex methods.

**Example `20171024191043_create_user.js`**
```javascript

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
}
```

**Example `20171024191043_create_task.js`**
```javascript


exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', function(table) {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.boolean('is_complete').notNullable().defaultTo(false);
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
}

```

Now we can run the below command performing a migration and updating our local database:

```bash
$ knex migrate:latest
```

### Adding/Dropping Columns

Now, let's say that we want to add a column to either our `Users` or `Tasks` tables. Similar to creating a table, we can do this by creating another migration file that will be specifically for adding or removing a column from the desired table. 

First lets create that migration script through `knex.js`

```bash
$ knex migrate:make add_fullname_to_users
```

Inside of our newly created migration script, we can now edit the `exports.up` and `exports.down` functions to look like this.

```javascript
exports.up = function(knex, Promise) {
  knex.schema.table('users', function(table) {
    table.integer('fullname').notNull()
  })
}

exports.down = function(knex, Promise) {
  knex.schema.table('users', function(table) {
    table.dropColumn('fullname')
  })
}
```

Now we can run the `knex:migrate` command to update our existing table.

```bash
$ knex migrate:latest
```

And voila! We should now have a new column named `fullname` in our `Users` table.

### Seeding Your Database

Similar to migrations, the `knex` module allows us to create scripts to insert initial data into our tables called seed files! If we have relations on our tables, the seeding **must be in a specific order** to so that we can rely on data that might already be in the database. For example, we must seed the users table first because our tasks table must validate a user id foreign key that already exists.

Lets create some seed files in this order:

```bash
$ knex seed:make 01_users
$ knex seed:make 02_tasks
```

Now lets insert some data into our seed scripts:

**Example 01_users.js**

```javascript
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        email: 'nigel@email.com',
        password: 'dorwssap'
      },
      {
        id: 2,
        email: 'nakaz@email.com',
        password: 'password1'
      },
      {
        id: 3
        email: 'jaywon@email.com',
        password: 'password123'
      }
    ]);
  });
};

```


**Example `02_tasks.js`**

```javascript
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').del()
  .then(function () {
    // Inserts seed entries
    return knex('tasks').insert([
      {
        title: 'Vaccuum the floors',
        description: 'Vaccum the living room and all bedroom',
        is_complete: false,
        user_id: 2
      },
      {
        title: 'Clean the car',
        description: 'Wash, wax and vacuum the car',
        is_complete: false,
        user_id: 1,
      },
      {
        title: 'Buy groceries',
        description: 'Milk, bread, cheese, eggs, flour',
        is_complete: true,
        user_id: 3,
      }
    ]);
  });
};
```

Now we can run the below command in the root of our project to seed our database!

```bash
$ knex seed:run
```