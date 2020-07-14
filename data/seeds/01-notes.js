
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'Pretentious Academic', textBody: 'The relativity of trendiness is very nearly revolutionary in its obfuscation.', tags: 'relativity, trendiness, revolutionary, obfuscation' },
        { title: 'Financial Advice', textBody: 'In the European market, always prorate mortgage-backed commodities.', tags: 'European, market, mortgage, commodities' },
        { title: 'Catchy Headline', textBody: '10 Jaw-Dropping Secrets Surgeons Won\'t Admit', tags: null },
        { title: 'Political Rhetoric', textBody: 'I will work for an America where crooked lawyers and overpaid CEOs can\'t destroy our brave military.', tags: 'work, America, lawyers, CEOs, military' },
        { title: 'Shakespeare Dialogue', textBody: 'Why doth despis\'d infirmity beseech th\' oppressor\'s soul?', tags: 'Shakespeare' }
      ]);
    });
};
