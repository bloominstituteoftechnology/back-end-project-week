
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('List').del()
    .then(function () {
      // Inserts seed entries
      return knex('List').insert([
        { id: 1, list_name: 'rowValue1', description: 'some description about row', user_id: 1 },
        { id: 2, list_name: 'rowValue2', description: 'some description about row', user_id: 1 },
        { id: 3, list_name: 'rowValue3', description: 'some description about row', user_id: 1 }
      ]);
    });
};