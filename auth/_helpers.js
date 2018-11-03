const forbidden = ['password', 'admin'];

const cleanUser = (user) => {
  return Object.entries(user).reduce((acc, [key, value]) => {
    if (forbidden.includes(key)) {
      return { ...acc };
    }
    return { ...acc, [key]: value };
  }, {});
};

module.exports = {
  cleanUser,
};
