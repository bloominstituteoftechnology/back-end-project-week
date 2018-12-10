process.env.NODE_ENV = 'test';

const notes = require('./Note');

describe('getAll()', () => {
  it('should be a function', () => {
    expect(typeof notes.getAll).toBe('function');
  });
  it('should return an array', async () => {
    let rows = await notes.getAll();
    expect(Array.isArray(rows)).toBe(true);
  });
  it('should return have a length of 6 notes', async () => {
    let rows = await notes.getAll();
    expect(rows.length).toBe(6);
  });
});
