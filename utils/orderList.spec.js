const orderList = require('./orderList');


test('orderList orders a list', () => {
  const list = [{ id: '0', left: '3', userId: 1 }, { id: '1', left: '2', userId: 1 }, { id: '2', left: -1, userId: 1 }, { id: '3', left: '1', userId: 1 }, { id: '4', left: -1, userId: 2 }];
  const ordered1 = [{ id: '2', left: -1, userId: 1 }, { id: '1', left: '2', userId: 1 }, { id: '3', left: '1', userId: 1 }, { id: '0', left: '3', userId: 1 }];
  const ordered2 = [{ id: '4', left: -1, userId: 2 }];

  expect(orderList(list, 1)).toEqual(ordered1);
  expect(orderList(list, 2)).toEqual(ordered2);
});
