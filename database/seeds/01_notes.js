exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("notes").insert([
        {
          title: "Note 1",
          textBody:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce justo mi, viverra sit amet ligula eu, cursus malesuada risus. Nunc ut fringilla diam. Aenean vitae dolor lacinia, sagittis neque eget, commodo tellus. Sed aliquet urna ut facilisis feugiat. Suspendisse cursus bibendum nibh, dictum congue est pulvinar in. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae convallis elit."
        },
        {
          title: "Note 2",
          textBody:
            "Praesent id tempor dui, quis aliquam lacus. Suspendisse ac urna vel erat ultrices dignissim. Morbi vestibulum tempus tempor. Donec sit amet egestas mi. Aliquam quis ultrices erat, vel lobortis est. Fusce id enim viverra, sodales nisi eu, ultrices magna. Nulla maximus metus vitae risus tempor rutrum. Morbi efficitur velit vel nisi auctor, vitae placerat elit cursus. Aenean commodo elit orci, in finibus justo vestibulum vitae. Mauris interdum, urna ac luctus ultricies, dui ligula auctor nisi, non consectetur turpis ligula quis est. Praesent tincidunt quis lacus fermentum molestie. Quisque dignissim, mi vel tristique sagittis, nunc ipsum luctus felis, nec vehicula erat urna non dui. Praesent porttitor, risus et gravida fermentum, sem sapien imperdiet sapien, vel consequat felis massa eu eros."
        },
        {
          title: "Note 3",
          textBody:
            "Quisque risus magna, ullamcorper nec felis interdum, sollicitudin malesuada dui. Vestibulum augue felis, porttitor vel nisi ut, tincidunt lacinia eros. Donec sit amet accumsan metus. Nam ultrices sem nisi, in dignissim mauris iaculis vitae. Nulla maximus lorem nec enim vulputate tincidunt. Phasellus elit nunc, ultrices pellentesque faucibus ut, posuere eu mi. Ut sit amet ex diam. Donec scelerisque turpis tellus, eget consequat est cursus eget. Aenean tellus mauris, tristique a diam et, euismod interdum ante. Vestibulum sed massa at sem pulvinar laoreet. Proin nec sapien augue. Proin dolor diam, maximus eu orci eu, aliquet tincidunt lectus. Curabitur tristique justo quis placerat tincidunt."
        }
      ]);
    });
};
