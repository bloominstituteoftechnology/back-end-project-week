
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl){
      tbl.increments();
      tbl.string('firstname');
      tbl.string('lastname');
      tbl.string('password').notNullable();
      tbl.string('username').notNullable().unique();
      tbl.string('slack_access_token')
      tbl.string('slack_scope')
      tbl.string('slack_user_id')
      tbl.string('slack_team_name')
      tbl.string('slack_team_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
