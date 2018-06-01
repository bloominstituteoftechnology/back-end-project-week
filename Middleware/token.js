import jwt from 'jsonwebtoken';

const secret = 'moonlanding';
const Token = user => {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
  };
  const options = {
    expiresIn: '24h',
  };

  return jwt.sign(payload, secret, options);
}

export default Token;