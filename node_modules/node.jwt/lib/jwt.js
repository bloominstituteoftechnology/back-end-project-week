/**
 * module dependencies
 */
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

/**
 * support algorithm map
 */
const algorithmMap = {
  HS256: 'sha256',
  HS384: 'sha384',
  HS512: 'sha512',
  RS256: 'RSA-SHA256'
}

/**
 * Map algorithm to hmac or sign type, to determine which crypto function to use
 */
const typeMap = {
  HS256: 'hmac',
  HS384: 'hmac',
  HS512: 'hmac',
  RS256: 'sign'
}

/**
 * error code map
 */
const errorMap = {
  '000': {
    code: '000',
    message: 'successful',
    payload: null
  },
  '001': {
    code: '001',
    message: 'Require secret',
    error: null
  },
  '002': {
    code: '002',
    message: 'Algorithm not supported',
    error: null
  },
  '003': {
    code: '003',
    message: 'Unvalid private secret for rsa sign',
    error: null
  },
  '004': {
    code: '004',
    message: 'No token supplied',
    error: null
  },
  '005': {
    code: '005',
    message: 'Not enough or too many segments',
    error: null
  },
  '006': {
    code: '006',
    message: '',
    error: null
  },
  '007': {
    code: '007',
    message: 'Token expired, signature verification failed (exp)',
    error: null
  },
  '008': {
    code: '008',
    message: 'The exp is invalid, the Expiration Time Claim must be a number representing the expiry date/time of this token in seconds since 01-Jan-1970 (see. rfc7519)',
    error: null
  },
  '009': {
    code: '009',
    message: 'Token not yet valid, signature verification failed (nbf)',
    error: null
  },
  '010': {
    code: '010',
    message: 'The nbf is invalid, the Not Before Claim must be the number representing the date/time after which this token can be accepted in seconds since 01-Jan-1970 (see. rfc7519)',
    error: null
  },
  '011': {
    code: '011',
    message: 'The iat is invalid, the Issued At Claim must be the number representing the date/time when the token was created in seconds since 01-Jan-1970 (see. rfc7519)',
    error: null
  }
}

/**
 * expose object
 */
const jwt = module.exports

jwt.version = '0.1.5'

/**
 * get secret, you can reload this method to create your secret
 * @param  {String}  str    secret or rsa secret path
 * @param  {Boolean} isPath is it path
 * @return {String}         secret
 */
jwt.secret = function secret (str, isPath = false) {
  if (!isPath) {
    return str
  }

  return fs.readFileSync(str)
}

/**
 * jwt encode
 * @param  {Object} payload   jwt payload
 * @param  {String} secret    sign secret
 * @param  {String} algorithm sign algorithm
 * @param  {Object} header    jwt header
 * @return {String}           jwt
 */
jwt.encode = function encode (payload, secret, algorithm = 'HS256', header = { type: 'JWT' }) {
  // check secret
  if (!secret) {
    throw new Error(errorMap['001'].message)
  }

  // header, typ is fixed value.
  let jwtHeader = Object.assign({}, header, {alg: algorithm})

  // create segments, all segments should be base64 string
  const segments = []
  segments.push(base64URLEncode(JSON.stringify(jwtHeader)))
  segments.push(base64URLEncode(JSON.stringify(payload)))
  segments.push(sign(segments.join('.'), algorithm, secret))

  return segments.join('.')
}

/**
 * jwt decode
 * @param  {String}  token    verify token
 * @param  {String}  secret   verify secret
 * @param  {Boolean} noVerify is it verify
 * @return {Object}           decode result
 */
jwt.decode = function decode (token, secret, noVerify = false) {
  // check token
  if (!token) {
    errorMap['004'].error = new Error(errorMap['004'].message)
    return errorMap['004']
  }
  // check segments
  const segments = token.split('.')
  if (segments.length !== 3) {
    errorMap['005'].error = new Error(errorMap['005'].message)
    return errorMap['005']
  }

  // All segment should be base64
  const headerSeg = segments[0]
  const payloadSeg = segments[1]
  const signatureSeg = segments[2]

  // base64 decode and parse JSON
  const header = JSON.parse(base64URLDecode(segments[0]))
  const payload = JSON.parse(base64URLDecode(segments[1]))

  if (!noVerify) {
    // verify signature. `sign` will return base64 string.
    const signingInput = [headerSeg, payloadSeg].join('.')

    if (!verify(signingInput, header.alg, secret, signatureSeg)) {
      return errorMap['006']
    }

    // Support for Registered claims

    // exp
    if (payload.exp) {
      var expInt = parseInt(payload.exp,10)
      if (isNaN(expInt)) {
        errorMap['008'].error = new Error(errorMap['008'].message)
        return errorMap['008']
      }
      var expDte = new Date( expInt * 1000 )
      if (Date.now() > expDte) {
        errorMap['007'].error = new Error(errorMap['007'].message)
        return errorMap['007']
      }
    }

    // nbf
    if (payload.nbf) {
      var nbfInt = parseInt(payload.nbf,10)
      if (isNaN(nbfInt)) {
        errorMap['010'].error = new Error(errorMap['010'].message)
        return errorMap['010']
      }
      var nbfDte = new Date( nbfInt * 1000 )
      if (Date.now() < nbfDte) {
        errorMap['009'].error = new Error(errorMap['009'].message)
        return errorMap['009']
      }
    }

    // iat
    if (payload.iat) {
      var iatInt = parseInt(payload.iat,10)
      if (isNaN(iatInt)) {
        errorMap['011'].error = new Error(errorMap['011'].message)
        return errorMap['011']
      }
    }

  }

  errorMap['000'].payload = payload
  return errorMap['000']
}

/**
 * private utils function
 */

/**
 * hmac sign
 * @param  {String} input     hamc sign input
 * @param  {String} algorithm hamc sign algorithm
 * @param  {String} secret    hamc sign secret
 * @return {String}           hamc signature
 */
function hmacSign (input, algorithm, secret) {
  return crypto.createHmac(algorithm, secret).update(input).digest('base64')
}

/**
 * rsa sign
 * @param  {String} input             rsa sign input
 * @param  {String} algorithm         rsa sign algorithm
 * @param  {String} privateSecret     rsa sign secret
 * @return {String}                   rsa signature
 */
function rsaSign (input, algorithm, privateSecret) {
  try {
    // sign with rsa_private_key.pem
    return crypto.createSign(algorithm).update(input).sign(privateSecret, 'base64')
  } catch (e) {
    throw new Error(errorMap['003'].message)
  }
}

/**
 * sign abstract method
 * @param  {String} input     sign input
 * @param  {String} algorithm sign algorithm
 * @param  {String} secret    sign secret
 * @return {String}           signature
 */
function sign (input, algorithm, secret) {
  const alg = algorithmMap[algorithm]

  if (!alg) {
    throw new Error(errorMap['002'].message)
  }

  const type = typeMap[algorithm]
  let signature

  switch (type) {
    case 'hmac':
      signature = hmacSign(input, alg, secret)
      break
    case 'sign':
      signature = rsaSign(input, alg, secret)
      break
    default:
      signature = hmacSign(input, alg, secret)
      break
  }

  return signature
}

/**
 * hamc verify signature
 * @param  {String} input      hamc verify input
 * @param  {String} algorithm  hamc verify algorithm
 * @param  {String} secret     hamc verify secret
 * @param  {String} signature  hamc verify signature
 * @return {Object}            hamc verify result
 */
function hmacVerify (input, algorithm, secret, signature) {
  try {
    const verify = signature === hmacSign(input, algorithm, secret)
    if (!verify) {
      errorMap['006'].message = 'Unvalid secret for hmac verify, signature verification failed'
      errorMap['006'].error = new Error(errorMap['006'].message)
    }
    return verify
  } catch (e) {
    errorMap['006'].message = 'Exception error in hamc verify, signature verification failed'
    errorMap['006'].error = e
    return false
  }
}

/**
 * rsa verify signature
 * @param  {String} input            rsa verify input
 * @param  {String} algorithm        rsa verify algorithm
 * @param  {String} publicSecret     rsa verify secret
 * @param  {String} signature        rsa verify signature
 * @return {Object}                  rsa verify result
 */
function rsaVerify (input, algorithm, publicSecret, signature) {
  try {
    // verify with rsa_public_key.pem
    const verify = crypto.createVerify(algorithm).update(input).verify(
      publicSecret,
      base64URLUnescape(signature),
      'base64'
    )
    if (!verify) {
      errorMap['006'].message = 'Unvalid public secret for rsa verify, signature verification failed'
      errorMap['006'].error = new Error(errorMap['006'].message)
    }
    return verify
  } catch (e) {
    errorMap['006'].message = 'Exception error in rsa verify, signature verification failed'
    errorMap['006'].error = e
    return false
  }
}

/**
 * abstract verify signature method
 * @param  {String} input      verify input
 * @param  {String} algorithm  verify algorithm
 * @param  {String} secret     verify secret
 * @param  {String} signature  verify signature
 * @return {Object}            verify result
 */
function verify (input, algorithm, secret, signature) {
  const alg = algorithmMap[algorithm]

  if (!alg) {
    errorMap['006'].message = 'Algorithm not recognized, signature verification failed'
    errorMap['006'].message = new Error(errorMap['006'].message)
    return false
  }

  const type = typeMap[algorithm]

  switch (type) {
    case 'hmac':
      return hmacVerify(input, alg, secret, signature)
    case 'sign':
      return rsaVerify(input, alg, secret, signature)
    default:
      return hmacVerify(input, alg, secret, signature)
  }
}

function base64URLEscape (str) {
  let jsonString = str

  return jsonString.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function base64URLEncode (str) {
  return base64URLEscape(Buffer.from(str).toString('base64'))
}

function base64URLUnescape (str) {
  let base64String = str

  // add = replaced in base64URLEscape
  base64String += new Array(5 - base64String.length % 4).join('=')
  return base64String.replace(/\+/g, '-').replace(/\//g, '_')
}

function base64URLDecode (str) {
  return Buffer.from(base64URLUnescape(str), 'base64').toString()
}
