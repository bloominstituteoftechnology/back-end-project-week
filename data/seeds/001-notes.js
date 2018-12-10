
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          id: 1, title: 'Here is your first note.', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at malesuada arcu, sit amet rhoncus enim. Donec sed nisi facilisis, maximus nisl eu, convallis ante. Sed volutpat nibh eget eros aliquam iaculis. Integer et massa sit amet purus molestie fermentum. Nullam elementum, elit sit amet imperdiet dignissim, nulla ipsum feugiat nulla, id pharetra nisi nunc ac felis. Vestibulum non dignissim est, vel volutpat arcu. Phasellus vehicula tristique metus, dictum faucibus arcu egestas et. Vestibulum eget mi lacus. Sed eu dui in urna congue laoreet in id nulla.'},
        { id: 2, title: 'Here is a test note.', body: 'Proin lobortis, arcu eu dapibus sagittis, nibh purus rutrum metus, sit amet ullamcorper lacus dui sed libero.Nunc porttitor odio et sapien semper gravida.Nam suscipit ipsum non mollis rutrum.Fusce id odio tellus.Mauris ornare eget ex eget vehicula.In gravida mauris ut dui pulvinar maximus.Integer dignissim iaculis neque vitae lacinia.Aliquam a tempus odio, et consequat mauris.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae' },
        { id: 3, title: 'These are really great notes.', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at malesuada arcu, sit amet rhoncus enim. Donec sed nisi facilisis, maximus nisl eu, convallis ante. Sed volutpat nibh eget eros aliquam iaculis. Integer et massa sit amet purus molestie fermentum. Nullam elementum, elit sit amet imperdiet dignissim, nulla ipsum feugiat nulla, id pharetra nisi nunc ac felis. Vestibulum non dignissim est, vel volutpat arcu. Phasellus vehicula tristique metus, dictum faucibus arcu egestas et. Vestibulum eget mi lacus. Sed eu dui in urna congue laoreet in id nulla' }
      ]);
    });
};
