exports.seed = function(knex, Promise) {
  return knex("notes")
    .del()
    .then(function() {
      return knex("notes").insert([
        {
          title: "Test1",
          body:" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non turpis ante. Aliquam commodo, diam in commodo malesuada, enim ante molestie lacus, mollis congue quam turpis id magna. Donec quis metus quis lorem volutpat pellentesque. Nulla bibendum pellentesque lectus non commodo. Nam vitae ullamcorper massa. Integer at porttitor nunc. Aliquam vitae arcu fermentum, eleifend nunc ac, pharetra nisl. Vestibulum in venenatis lorem. Morbi accumsan, tellus sit amet porttitor sollicitudin, tellus neque imperdiet sapien, sed ultrices urna sapien vitae est.",
          checklist: '[{"checked": true, "name":"string"}]',
          tags: '[{"id":"string","text":"string"}]',
          userID: 0
        },
        {
          title: "Test2",
          body: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non turpis ante. Aliquam commodo, diam in commodo malesuada, enim ante molestie lacus, mollis congue quam turpis id magna. Donec quis metus quis lorem volutpat pellentesque. Nulla bibendum pellentesque lectus non commodo. Nam vitae ullamcorper massa. Integer at porttitor nunc. Aliquam vitae arcu fermentum, eleifend nunc ac, pharetra nisl. Vestibulum in venenatis lorem. Morbi accumsan, tellus sit amet porttitor sollicitudin, tellus neque imperdiet sapien, sed ultrices urna sapien vitae est.",
          checklist: "[]",
          tags: "[]",
          userID: 0
        }
      ]);
    });
};
