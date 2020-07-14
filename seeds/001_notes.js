
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          note_title: 'first note',
          text_body: 'First Basics Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc semper rutrum erat, a ullamcorper orci ultricies quis. Nunc dolor leo, commodo ut sapien quis, accumsan placerat augue. Fusce consectetur diam sit amet ipsum molestie fringilla. Sed nec aliquam magna, quis auctor nibh. Nulla dictum urna a suscipit cursus. Fusce auctor sem vitae imperdiet consequat. Integer ullamcorper velit vitae sapien fermentum cursus. Nam sagittis volutpat lorem, molestie fringilla mi molestie vitae.',
          tags: 'FIRST HTML JAVASCRIPT CSS'
        },
        {
          note_title: 'second note',
          text_body: 'Second Frameworks Nunc dictum vitae odio et faucibus. Proin in lorem turpis. Ut finibus et orci at hendrerit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse blandit, eros et facilisis venenatis, metus quam ullamcorper massa, a efficitur nulla massa eu turpis. Curabitur ut arcu suscipit felis porttitor placerat. Proin vulputate eget ex quis blandit. Morbi mollis viverra sagittis.',
          tags: 'SECOND REACT REDUX STATE'
        },
        {
          note_title: 'third note',
          text_body: 'Third Databases Proin feugiat dolor lorem, quis condimentum orci suscipit sit amet. Phasellus vel porta est. Aenean vel posuere lorem, sed lobortis sem. Vestibulum ac lacinia magna, vitae tincidunt massa. Donec pellentesque pellentesque sem ut venenatis. Donec lacus nunc, pulvinar vitae ante sed, cursus eleifend metus. Maecenas in urna orci. Phasellus ut mauris vehicula, condimentum dolor in, vehicula nunc. Nunc condimentum dui ligula. Mauris nec velit sodales, laoreet velit cursus, feugiat dui. Morbi tincidunt, leo vel viverra congue, tortor justo tincidunt odio, nec malesuada augue erat vitae sem. Curabitur at augue consectetur, gravida leo pretium, aliquet orci. Fusce turpis quam, tincidunt sit amet feugiat quis, auctor semper magna. Proin hendrerit fermentum interdum.',
          tags: 'THIRD DB SQLITE POSTGRE FIREBASE'
        }
      ]);
    });
};
