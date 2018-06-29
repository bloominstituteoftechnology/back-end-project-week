const path = require('path')
const jwt = require('../index')

// SHA
const secret = jwt.secret('secret')
const token1 = jwt.encode('I am Aidan', secret, 'HS256')
const r1 = jwt.decode(token1, secret)

console.log(r1)

// RSA
const priPath = path.resolve(__dirname, '../test/pem/private.pem')
const pubPath = path.resolve(__dirname, '../test/pem/public.pem')
const priSecret = jwt.secret(priPath, true)
const pubSecret = jwt.secret(pubPath, true)

const token2 = jwt.encode('I am Aidan', priSecret, 'RS256')
const r2 = jwt.decode(token2, pubSecret)

console.log(r2)
