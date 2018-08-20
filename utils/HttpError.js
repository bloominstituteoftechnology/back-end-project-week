class HttpError extends Error {
  constructor({ code, ...rest }) {
    super(rest);
    this.code = code;
  }
}

module.exports = HttpError;
