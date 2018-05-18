/* eslint-disable */
/* cSpell:disable */

//# config.sample.js
module.exports = {
  mongodb: {
    ip: '127.0.0.1',
    port: '27017',
    app: 'nodejs'
  },
  crypto: {
    privateKey:
      '37LvDSasdfasfsaf3a3IEIA;3r3oi3joijpjfa3a3m4XvjYOh9Yaa.p3id#IEYDNeaken',
    tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
  },
  email: {
    username: 'someone@gmail.com',
    password: 'somepassword',
    accountName: 'Snowflake',
    verifyEmailUrl: 'verifyEmail'
  },
  validation: {
    username: /^[a-zA-Z0-9]{6,12}$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/
  }
}
