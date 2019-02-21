// Deps
var _ = require('lodash')
var qs = require('qs')
var requireAll = require('require-all')
var url = require('url')

// Init
var utils = {}

/**
 * Adds or removes a param to params array
 *
 * @param {object} params
 * @param {string} name
 * @param value
 * @returns {object}
 */

utils.addParamToParams = function (params, name, value) {
  if (value !== undefined && value !== '') {
    params[name] = value
  } else {
    if (params.hasOwnProperty(name)) {
      delete params[name]
    }
  }
  return params
}

/**
 * Checks a param and adds it to params array
 *
 * @param {object} route
 * @param {object} allParams
 * @param {string} param
 * @param value
 * @returns {object}
 */

utils.checkAndAddParam = function (route, allParams, param, value) {
  var defaultParamValue = _.get(route, 'params.' + param + '.default')

  if (defaultParamValue === value) { value = undefined }

  return utils.addParamToParams(allParams, param, value)
}

/**
 * Cleans URL, mostly for SEO
 *
 * @param {string} url
 * @returns {string}
 */

utils.cleanUrl = function (url) {
  url = url
  .replace(/\-?:[^\-\?]*\-?\??/g, '') // https://regex101.com/r/cK7yE5/1
  .replace(/\/{2,}/g, '/') // Tum cift // lari siliyor
  .replace(/\/-/g, '/') // -/ lari siliyor
  .replace(/\/-(.*)/g, '/$1') // /-.... > / (tireyle baslayani eliyor)
  .replace(/(-:.*)(?=\?)/g, '') // /satilik-:var? > /satilik
  .replace(/\/:.*\?-/g, '') // /:var?-satilik > /satilik
  .replace(/\/(.*)-$/g, '/$1') // /izmir-satilik- > /izmir-satilik
  .replace(/\/.*(-)\?.*$/g, '') // /izmir-satilik-?listType=table > /izmir-satilik?listType=table
  .replace(/\?+/g, '') // /satilik?? > /satilik?

  return url
}

/**
* Creates url query from the provided parameters
*   using ones mentioned in filters array only
*
* @param {object} params - Parameters container
* @param {array} filters - Filters array
* @returns {string}      - Querystring
*/

utils.createUrlQuery = function (params, filters) {
  var resultParams = _.pick(params, filters)
  var filteredResultParams

  // Removing empty elements
  filteredResultParams = _.reduce(resultParams, function (result, num, key) {
    if (_.isArray(num)) {
      num = _.compact(num)
    }

    if ((_.isArray(num) && !(_.isEmpty(num))) || (!(_.isArray(num)) && num)) {
      result[key] = num
    }

    return result
  }, {})

  return qs.stringify(filteredResultParams)
}

/**
* Gets default params, overrides with route params
*
* @this {RouterExpress}
* @param {object} request - Express request
* @param {object} route - Route object
* @returns {object} Parameters object
*/

utils.fetchParams = function (request, route) {
  var regexParams = utils.getRegexParams(request.path, route)

  var routeParams = route.params || {}
  var defaultParams = _.mapValues(routeParams, 'default')

  return _.merge(defaultParams, request.query, request.params, regexParams, {route: route})
}

/**
 * Gets query and regex params from url
 *
 * @param {String} inputUrl
 * @param {Object} route
 * @returns {Object}       - Params as array
 */

utils.getParamsFromUrl = function (inputUrl, route) {
  var parsedUrl = url.parse(inputUrl, true)
  var regexParams = utils.getRegexParams(inputUrl, route)
  var allParams = _.merge(parsedUrl.query, regexParams)

  return allParams
}

/**
 * Get params from url by regex
 *
 * @param {String} path  - url to parse
 * @param {Object} route - RouterExpress object
 * @returns {Object}     - Params container
 */

utils.getRegexParams = function (path, route) {
  var regexUrl = _.get(route, 'regexUrl')
  var regexParams = _.get(route, 'regexParams')
  path = path.split('?').shift()

  if (!regexUrl || !regexParams) { return {} }

  var routeRegex = new RegExp(route.regexUrl)
  var matches = routeRegex.exec(path)
  var params = {}

  _.each(regexParams, function (param, i) {
    var matchName = matches[i + 1]
    if (matchName) {
      if (matchName[matchName.length - 1] === '-') {
        matchName = matchName.slice(0, -1)
      }
    }

    params[param] = matchName
  })

  return params
}

/**
 * Finds all routes in modules folder and merges them
 *
 * @param {String} modulesDir
 * @returns {Array}
 */
utils.fetchRoutes = function (modulesDir) {
  if (!modulesDir) {
    modulesDir = module.parent.parent.paths[0].slice(0, -12) + 'modules'
  }

  var libs = requireAll({
    dirname: modulesDir,
    filter: /(routes)\.js$/,
    excludeDirs :  /^\.(git|svn)$/
  })

  return _.flatten(
    _.reduce(libs, function (results, routesObj) {

      results.push(routesObj.routes);

      return results;
    }, [])
  )
}

/**
 * Injects middleware
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} middleware
 * @param {Function} callback
*/

utils.injectMw = function (req, res, middleware, callback) {
  if (middleware) {
    middleware(req, res, function () {
      callback(req, res)
    })
  } else {
    callback(req, res)
  }
}

/**
 * Inject parameters to route
 *
 * @param {object} routeObject
 * @param {object} params
 * @returns {string}
 */
utils.injectParamsToRoute = function (routeObject, params) {
  var url = routeObject.url

  var routeParams = _.get(routeObject, 'params')
  var routeParamsDefaultValues = _.mapValues(routeParams, 'default')
  var filteredParams = _.omitBy(params, function (v, k) {
    return routeParamsDefaultValues[k] === v
  })
  var extraParams = {}

  _.forEach(filteredParams, function (paramValue, paramName) {
    // If url regex has param as :param, replace it
    if (url.search(paramName) !== -1) {
      url = url
        .replace(':' + paramName + '?/?', paramValue + '/')
        .replace(':' + paramName + '?-?', paramValue + '-')
        .replace('-?:' + paramName + '?', '-' + paramValue)
        .replace(':' + paramName + '?', paramValue)
        .replace(':' + paramName, paramValue)
    } else {
      // If not, add it to the end
      extraParams[paramName] = paramValue
    }
  })

  return utils.prepareUrl(url, extraParams)
}

/**
 * Filters routes which has a field name: fieldName
 *
 * @param {Array} routes
 * @param {String} fieldName
 * @returns {Array}
 */
utils.filterRoutesBy = function (routes, fieldName) {
  return _.groupBy(_.filter(routes, function (route) {
    return _.has(route, fieldName)
  }), function (route) {
    return route[fieldName]
  })
}

/**
 * Groups routes by order type
 * @param {Array} routes
 * @param {Function} callback
 */

utils.parseOrders = function (routes, callback) {
  var noOrderRoutes = _.filter(routes, function (route) {
    return !(_.has(route, 'order')) && !(_.has(route, 'lastOrder'))
  })

  var orderRoutes = utils.filterRoutesBy(routes, 'order')
  var lastOrderRoutes = utils.filterRoutesBy(routes, 'lastOrder')

  callback(noOrderRoutes, orderRoutes, lastOrderRoutes)
}

/**
 * Prepares url by cleaning its base and adding params
 *
 * @param {string} url
 * @param {object} params
 * @returns {string}
 */

utils.prepareUrl = function (url, params) {
  // Removing all unused url parameters
  url = utils.cleanUrl(url)

  // Adding query params to the end
  var urlSuffix = qs.stringify(params)
  var urlSeperator = urlSuffix ? '?' : ''

  // Finalizing
  return url + urlSeperator + urlSuffix
}

// Exports

module.exports = utils
