
exports.up = function(knex, Promise) {
return knex.schema.table('posts',table=>{
table.renameColumn('posted_by', 'poster');
table.renameColumn('contents', 'content');
})
};

exports.down = function(knex, Promise) {
return knex.schema.table('posts',table=>{
table.renameColumn('poster','posted_by');
table.renameColumn('content', 'contents');
})
};
