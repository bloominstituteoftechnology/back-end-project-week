
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {user_id: b8d64594-535b-8975-1f5e-5143b6c8ffe3, title: '1: green outcomes', content:'Inspire equal opportunity resist'},
        {user_id: b8d64594-535b-8975-1f5e-5143b6c8ffe3, title: '2: Silo overcome', content:'Silo overcome injustice ideate fairness parse, innovation accessibility.'},
        {user_id: 39d25ca7-f004-bb01-0cfd-3a0828477e61, title: '3: think tank',text: 'Our work scalable, collaborate outcomes think tank synergy.'},
        {user_id: 2a1ee8a3-01a0-3578-fb22-db59c812b6f3, title: '4: mental picture', content:'Inspire compassion co-create social return on investment '},
        {user_id: e93ea9d4-0bfa-5f29-f6e8-90a00055e63e, title: '5: green outcomes', content:'Inspire equal opportunity resist; green space outcomes. '},
        {user_id: e93ea9d4-0bfa-5f29-f6e8-90a00055e63e, title: '6: Silo overcome',text: 'Capacity building milestones problem-solvers resilient benefit corporation.'},
        {user_id: e93ea9d4-0bfa-5f29-f6e8-90a00055e63e, title: '7: think tank', content:'Challenges and opportunities human-centered venture philanthropy radical entrepreneur'},
        {user_id: ace46ae7-349e-85e0-e94f-2a45b79681e4, title: '8: social return', content:'Human-centered compelling the resistance or, social entrepreneur blended value.'},
        {user_id: ace46ae7-349e-85e0-e94f-2a45b79681e4, title: '9: moral compass', content: 'Contextualize, commitment collective impact effective altruism best practices.'}
      ]);
    });
};
