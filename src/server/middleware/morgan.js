const morgan = require('morgan')
morgan.token('reqbody', req => `\n\t${JSON.stringify(req.body)}`)
morgan.format('lambda', ':method :url :status :response-time ms :reqbody')

module.exports = morgan