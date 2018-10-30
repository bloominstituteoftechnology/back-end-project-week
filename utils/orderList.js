module.exports = function orderExpected(arr) {
  const workingArr = [...arr];
  const ordered = [];
  let i = 0;
  let target = -1;
  while (workingArr.length && i < workingArr.length) {
    if (workingArr[i].left === target) {
      const [selected] = workingArr.splice(i, 1);
      target = selected.id;
      i = 0;
      ordered.push(selected);
    } else {
      i += 1;
    }
  }
  return ordered;
};
