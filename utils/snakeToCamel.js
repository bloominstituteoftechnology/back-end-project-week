const snakeToCamel = obj => Object.entries(obj).reduce((accum, [key, value]) => {
  const snakeKey = key.replace(/_./g, match => match[1].toUpperCase());
  return { ...accum, [snakeKey]: value };
}, {});

module.exports = snakeToCamel;
