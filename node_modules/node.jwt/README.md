# node.jwt

A lightweight library for encode and decode JSON Web Tokens (JWT).

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![Build Status](https://www.travis-ci.org/AidanDai/node.jwt.svg?branch=master)](https://www.travis-ci.org/AidanDai/node.jwt)

## Install

```bash
$ npm install node.jwt --save-dev

$ yarn add node.jwt
```

## Usage

### Symmetric encryption

```javascript
const jwt = require('node.jwt')
const payload = {
  "sub": "aidandai@126.com",
  "iss": "https://aidandai.github.io",
  "exp": Date.now() / 1000 + (60 * 60 * 24 * 2),
  "nbf": Date.now() / 1000 - (60 * 5),
  "iat": Date.now() / 1000,
  "data": {
    "uid": "1sf72323rjsdfsdkl223434k",
    "name": "Aidan",
    "authority": "1001111010101110",
  }
}

// get secret, you can reload this method to create your secret
const secret = jwt.secret('I am Aidan')

// encode
var token = jwt.encode(payload, secret);

// decode
var result = jwt.decode(token, secret)
console.log(result)

// {
//   code: '000', // error code of verify, you can learn more from lib/jwt.js
//   message: 'successful', // error message of verify, , you can learn more from lib/jwt.js
//   payload: {
//     "sub": "aidandai@126.com",
//     "iss": "https://aidandai.github.io",
//     "exp": Date.now() / 1000 + (60 * 60 * 24 * 2),
//     "nbf": Date.now() / 1000 - (60 * 5),
//     "iat": Date.now() / 1000,
//     "data": {
//       "uid": "1sf72323rjsdfsdkl223434k",
//       "name": "Aidan",
//       "authority": "1001111010101110",
//     }
//   }
// }
```

### Asymmetric encryption

```javascript
const jwt = require('node.jwt')
const payload = {
  "sub": "aidandai@126.com",
  "iss": "https://aidandai.github.io",
  "exp": Date.now() / 1000 + (60 * 60 * 24 * 2),
  "nbf": Date.now() / 1000 - (60 * 5),
  "iat": Date.now() / 1000,
  "data": {
    "uid": "1sf72323rjsdfsdkl223434k",
    "name": "Aidan",
    "authority": "1001111010101110"
  }
}

const privateSecret = getYourPrivateSceret()
const publicSceret　＝　getYourPublicSecret()

// encode
var token = jwt.encode(payload, privateSecret, 'RS256')

// decode
var result = jwt.decode(token, publicSceret)
console.log(result)

// {
//   code: '000', // error code of verify, you can learn more from lib/jwt.js
//   message: 'successful', // error message of verify, , you can learn more from lib/jwt.js
//   payload: {
//     "sub": "aidandai@126.com",
//     "iss": "https://aidandai.github.io",
//     "exp": Date.now() / 1000 + (60 * 60 * 24 * 2),
//     "nbf": Date.now() / 1000 - (60 * 5),
//     "iat": Date.now() / 1000,
//     "data": {
//       "uid": "1sf72323rjsdfsdkl223434k",
//       "name": "Aidan",
//       "authority": "1001111010101110"
//     }
//   }
// }
```

### Interface

```javascript
/**
 * jwt encode
 * @param  {Object} payload   jwt payload
 * @param  {String} secret    sign secret
 * @param  {String} algorithm sign algorithm
 * @param  {Object} header    jwt header
 * @return {String}           jwt
 */
encode (payload, secret, algorithm = 'HS256', header = { type: 'JWT' })

/**
 * jwt decode
 * @param  {String}  token    verify token
 * @param  {String}  secret   verify secret
 * @param  {Boolean} noVerify is it verify
 * @return {Object}           decode result
 */
decode (token, secret, noVerify = false)
```

### Algorithms

By default the algorithm to encode is `HS256`.

The supported algorithms for encoding and decoding are `HS256`, `HS384`, `HS512` and `RS256`.

```javascript
// encode using HS512
jwt.encode(payload, secret, 'HS512')
```

### About JWT

- [Introduction to JSON Web Tokens](https://jwt.io/introduction/)

- [JWT(JSON Web Token)](http://self-issued.info/docs/draft-jones-json-web-token.html)

##  Contributors

- stephenbeauchamp: [https://github.com/stephenbeauchamp](https://github.com/stephenbeauchamp)
