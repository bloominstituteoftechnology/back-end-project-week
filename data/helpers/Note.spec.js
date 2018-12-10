process.env.NODE_ENV = 'test';

const notes = require('./Note');
const db = require('../dbConfig');

beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

describe('note helpers', () => {
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
  describe('get()', () => {
    it('should be a function', () => {
      expect(typeof notes.getAll).toBe('function');
    });
    it('should return an object', async () => {
      let row = await notes.get(1);
      expect(typeof row).toBe('object');
    });
    it('should return undefined if note not found', async () => {
      let row = await notes.get(10);
      expect(row).toBe(undefined);
    });
  });
  describe('insert()', () => {
    it('should be a function', () => {
      expect(typeof notes.insert).toBe('function');
    });
    it('should return a new note object', async () => {
      let note = await notes.insert({
        title: 'new note',
        content: 'hello',
        user_id: 1
      });
      expect(typeof note).toEqual('object');
    });
  });
});
