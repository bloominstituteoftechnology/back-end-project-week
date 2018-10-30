const orderList = require('./orderList');


test('orderList orders a list', () => {
  const list = [{ id: '0', left: '3' }, { id: '1', left: '2' }, { id: '2', left: -1 }, { id: '3', left: '1' }];
  const ordered = [ { id: '2', left: -1 }, { id: '1', left: '2' }, { id: '3', left: '1' }, { id: '0', left: '3' }];

  expect(orderList(list)).toEqual(ordered);
});
