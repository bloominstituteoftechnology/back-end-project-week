// Dependencies
var _ = require('lodash')
var async = require('async')
var path = require('path')
var utils = require('./utils')

/**
* Initializes router
*
* @constructor
* @this {RouterExpress}
* @param {object} routes Route object
*/

function RouterExpress (routes, modulesDir) {
  if (!modulesDir) {
    modulesDir = module.parent.paths[0].slice(0, -12) + 'modules'
  }

  if (!routes) {
    routes = RouterExpress.fetchRoutes()
  }

  this.routes = routes
  this.modulesDir = modulesDir
}

/**
* Binds routes to actions
*
* @this {RouterExpress}
* @param {object} app - Express app
*/

RouterExpress.prototype.bind = function (app, middleware) {
  if (middleware === undefined) {
    middleware = false
  }

  this.middleware = middleware

  var that = this

  utils.parseOrders(this.routes, function (noOrderRoutes, orderRoutes, lastOrderRoutes) {
    that.parseOrderedRoutes(app, orderRoutes, that, function () {
      async.each(noOrderRoutes, function (route, midCallback) {
        that.injectRoute(app, route, that)

        midCallback()
      }, function () {
        that.parseOrderedRoutes(app, lastOrderRoutes, that, function () {
          // console.info('Routes added') - @deprecated
        })
      })
    })
  })
}

/**
 * Binds ordered routes to app
 *
 * @param {Object} app
 * @param {Array} orderedRoutes
 * @param {Object} that - RouterExpress object
 * @param {Function} callback
 */

RouterExpress.prototype.parseOrderedRoutes = function (app, orderedRoutes, that, callback) {
  async.each(Object.keys(orderedRoutes), function (order, midCallback) {
    var routes = _.get(orderedRoutes, order)

    _.forEach(routes, function (route) {
      that.injectRoute(app, route, that)
    })

    midCallback()
  }, function () {
    callback()
  })
}

/**
 * Injects a route to app
 *
 * @param {Object} app
 * @param {Object} route
 * @param {Object} that - RouterExpress Object
 */
RouterExpress.prototype.injectRoute = function (app, route, that) {
  var module = _.get(route, 'module', _.get(route, 'actionFile'))
  if (!module) {
    throw new Error('route.module not defined for: ' + route.name)
  }
  var actionFile = path.join(that.modulesDir, module)

  var bindUrl = _.get(route, 'regexUrl', _.get(route, 'url'))
  if (!bindUrl) {
    throw new Error('route.url missing for: ' + route.name)
  }

  var method = _.get(route, 'method', 'get')

  app[method](bindUrl, function (req, res) {
    res.params = utils.fetchParams(req, route)

    utils.injectMw(req, res, that.middleware, function (req, res) {
      try {
        require(actionFile)(req, res)
      } catch (e) {
        throw new Error('Route action file cannot be loaded: ' + route.name + '. Error: ' + e)
      }
    })
  })
}

RouterExpress.prototype.createUrlQuery = utils.createUrlQuery

/**
* Creates a URL based on route name and parameters
*
* @this {RouterExpress}
* @param {string} routeName - Name of the route
* @param {object=} params   - Parameters object
* @returns {string}         - Created url
*
* @example
* route = { name: 'someRoute', url: '/someUrl' };
* // returns "/someUrl?param1=foo"
* RouterExpress.createUrl('someRoute', {param1: 'foo'})
*/

RouterExpress.prototype.createUrl = function (routeName, params) {
  var routeObject = _.find(this.routes, {name: routeName})

  if (!routeObject) {
    throw new Error('createUrl failed. routeName=' + routeName + ' params=' + params)
  }

  return utils.injectParamsToRoute(routeObject, params)
}

/**
* Updates a url based on a parameter and its value
* If no value specified, the parameter is removed from url
*
* @this {RouterExpress}
* @param {string} baseurl The url to update
* @param {string|array} param name or names array of the parameter to update
* @param {primitive} value Value of the parameter, empty if to remove parameter
* @returns {string} New url
*/

RouterExpress.fetchRoutes = utils.fetchRoutes

RouterExpress.prototype.updateUrlWithParam = function (baseurl, params, value, route) {
  var allUrlParams = utils.getParamsFromUrl(baseurl, route)

  if (typeof params === 'object') {
    _.each(params, function (param) {
      allUrlParams = utils.checkAndAddParam(route, allUrlParams, param, value)
    })
  } else {
    allUrlParams = utils.checkAndAddParam(route, allUrlParams, params, value)
  }

  return this.createUrl(route.name, allUrlParams)
}

// Exports

module.exports = RouterExpress
