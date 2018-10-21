const camelToSnake = obj => Object.entries(obj).reduce((accum, entry) => {
  const [key, value] = entry;
  const camelKey = key.replace(
    /([a-z])([A-Z])/g,
    match => `${match[0]}_${match[1].toLowerCase()}`,
  );
  return { ...accum, [camelKey]: value };
}, {});

module.exports = camelToSnake;
