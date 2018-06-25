// to seed, run `seed` in project root
// warning, this will blow away current data

const faker = require('faker');


const markDownExample = `
#### My Todo List
- [ ] todo item 1
- [ ] todo item 2
- [x] todo item 3
- [x] todo item 4
`;

let content;
module.exports = Array(5).fill().map((_, i) => {
  content = i === 0 ? markDownExample : faker.random.words(10);
  return {
    id: i,
    title: `Card title #${i}`,
    content: content,
    tags: faker.random.words() 
  }
});
