class UserNotFoundError extends Error {
  constructor(user, ...rest) {
    super(...rest)
    this.message = `User '${user}' not found`
    this.status = 404
  }
}

class InvalidPasswordError extends Error {
  constructor() {
    super()
    this.message = 'Invalid password'
    this.status = 400
  }
}

module.exports = {
  UserNotFoundError,
  InvalidPasswordError
}