const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const createUser = async function(req, res) {
  const { username, password } = req.body;
  const user = new User({ username, password });
  try {
    const savedUser = await user.save();
    res.json({ status: 'success', savedUser });
  }
  catch (err) {
    res.json({ status: err });
  };
};

const login = function(username, password, history) {
  return async dispatch => {
    try {
      const response = await axios.post(`${ROOT_URL}/login`, { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      dispatch({ type: USER_AUTHENTICATED });
      history.push('/jokes');
    } catch (err) {
      dispatch(authError('Error getting token.'));
    };
  };
};

module.exports = {
  createUser,
  login,
}