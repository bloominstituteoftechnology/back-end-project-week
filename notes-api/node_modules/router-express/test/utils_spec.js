/* global describe, it */

var assert = require('assert')
var path = require('path')
var utils = require('../lib/utils')

// addParamToParams

describe('Unit::utils.addParamToParams', function () {
  it('should add a normal param to params', function () {
    assert.deepEqual({foo: 'bar', baz: 'qux'}, utils.addParamToParams({foo: 'bar'}, 'baz', 'qux'))
  })

  it('should update a param', function () {
    assert.deepEqual({foo: 'baz'}, utils.addParamToParams({foo: 'bar'}, 'foo', 'baz'))
  })

  it('should delete a param', function () {
    assert.deepEqual({}, utils.addParamToParams({foo: 'bar'}, 'foo', undefined))
    assert.deepEqual({}, utils.addParamToParams({foo: 'bar'}, 'foo', ''))
  })
})

// checkAndAddParam

describe('Unit::utils.checkAndAddParam', function () {
  var sampleRoute = {
    regexUrl: /\/(.*)\-?satilik/,
    regexParams: ['location'],
    params: {
      param1: { default: 'foo' }
    }
  }

  it('should not add a param with a default value', function () {
    assert.deepEqual({}, utils.checkAndAddParam(sampleRoute, {}, 'param1', 'foo'))
  })

  it('should add a param with a different value', function () {
    assert.deepEqual({param1: 'bar'}, utils.checkAndAddParam(sampleRoute, {}, 'param1', 'bar'))
  })
})

// cleanUrl

describe('Unit::utils.cleanUrl', function () {
  it('should convert regex properly', function () {
    assert.equal(utils.cleanUrl('/satilik'), '/satilik')
    assert.equal(utils.cleanUrl('//satilik'), '/satilik')
    assert.equal(utils.cleanUrl('///satilik'), '/satilik')
    assert.equal(utils.cleanUrl('////satilik'), '/satilik')
    assert.equal(utils.cleanUrl('/-satilik'), '/satilik')
    assert.equal(utils.cleanUrl('/satilik-'), '/satilik')
    assert.equal(utils.cleanUrl('/-satilik-'), '/satilik')
    assert.equal(utils.cleanUrl('/yazi/etiket//nufus-yapisi'), '/yazi/etiket/nufus-yapisi')
  })
})

// createUrlQuery

describe('Unit::utils.createUrlQuery', function () {
  it('should select some fields normally', function () {
    assert.deepEqual(
      utils.createUrlQuery({a: 1, b: 2, c: 3}, ['a', 'b']),
      'a=1&b=2'
    )
  })

  it('should clean empty elements', function () {
    assert.deepEqual(utils.createUrlQuery({a: undefined, b: 2, c: 3}, ['a', 'b']), 'b=2')
    assert.deepEqual(utils.createUrlQuery({a: '', b: 2, c: 3}, ['a', 'b']), 'b=2')
    assert.deepEqual(utils.createUrlQuery({a: null, b: 2, c: 3}, ['a', 'b']), 'b=2')
  })

  it('should add arrays', function () {
    assert.deepEqual(
      utils.createUrlQuery({a: 1, b: [2, 3], c: 4}, ['a', 'b']),
      'a=1&b%5B0%5D=2&b%5B1%5D=3'
    )
  })

  it('should clean empty array elements', function () {
    assert.deepEqual(
      utils.createUrlQuery({a: 1, b: [2, ''], c: 4}, ['a', 'b']),
      'a=1&b%5B0%5D=2'
    )
  })

  it('should remove empty arrays', function () {
    assert.deepEqual(
      utils.createUrlQuery({a: 1, b: [null, ''], c: 4}, ['a', 'b', 'c']),
      'a=1&c=4'
    )
  })
})

// fetchParams

describe('Unit::utils.fetchParams', function () {
  var route = {
    params: {
      bar: { default: 123 }
    }
  }

  it('should run empty ', function () {
    assert.deepEqual(utils.fetchParams({path: '/foo'}, {}), {route: {}})
  })

  it('should get default values ', function () {
    assert.deepEqual(
      utils.fetchParams({path: '/foo'}, route),
      {route: route, bar: 123}
    )
  })

  it('should override query,params > default ', function () {
    assert.deepEqual(
      utils.fetchParams({path: '/foo', query: {bar: 234}}, route),
      {route: route, bar: 234}
    )

    assert.deepEqual(
      utils.fetchParams({path: '/foo', params: {bar: 345}}, route),
      {route: route, bar: 345}
    )
  })

  it('should override params > query', function () {
    assert.deepEqual(
      utils.fetchParams({path: '/foo', query: {bar: 456}, params: {bar: 567}}, route),
      {route: route, bar: 567}
    )
  })
})

// getParamsFromUrl

describe('Unit::utils.getParamsFromUrl', function () {
  var sampleRoute = {
    regexUrl: /\/(.*)\-?satilik/,
    regexParams: ['location']
  }

  it('should get no params', function () {
    assert.deepEqual({}, utils.getParamsFromUrl('/satilik'), sampleRoute)
  })

  it('should get a regex param', function () {
    assert.deepEqual({location: 'istanbul'}, utils.getParamsFromUrl('/istanbul-satilik', sampleRoute))
  })

  it('should get a query param', function () {
    assert.deepEqual({location: '', foo: 'bar'}, utils.getParamsFromUrl('/satilik?foo=bar', sampleRoute))
  })
})

// getRegexParams

describe('Unit::utils.getRegexParams', function () {
  var sampleRoute = {
    regexUrl: /\/?(.*)\/satilik-?(.*)/,
    regexParams: ['param1', 'param2']
  }

  it('should get one regex param', function () {
    assert.deepEqual({param1: 'remax', param2: ''}, utils.getRegexParams('/remax/satilik', sampleRoute))
  })

  it('should get two regex params', function () {
    assert.deepEqual({param1: 'efe', param2: 'daire'}, utils.getRegexParams('/efe/satilik-daire', sampleRoute))
  })

  it('should get no regex params', function () {
    assert.deepEqual({param1: '', param2: ''}, utils.getRegexParams('/satilik', sampleRoute))
  })
})

// injectMiddleware

describe('Unit::utils.injectMiddleware', function () {
  var req = {foo: 'foo'}
  var res = {bar: 'bar'}

  it('should work without middleware', function (done) {
    utils.injectMw(req, res, false, function (reqA, resA) {
      assert.deepEqual(req, reqA)
      assert.deepEqual(res, resA)
      done()
    })
  })

  var middleWare = function (req, res, callback) {
    callback()
  }

  it('should work with middleware', function (done) {
    utils.injectMw(req, res, middleWare, function (reqA, resA) {
      assert.deepEqual(req, reqA)
      assert.deepEqual(res, resA)
      done()
    })
  })
})

// injectParamsToRoute

describe('Unit::utils.injectParamsToRoute', function () {
  var route = {
    url: '/foo'
  }

  it('should work without any params', function () {
    assert.strictEqual(utils.injectParamsToRoute(route, {}), '/foo')
  })

  it('should add params', function () {
    assert.strictEqual(utils.injectParamsToRoute(route, {bar: 123}), '/foo?bar=123')
  })

  it('should not add params with default value', function () {
    var routeWithDefaults = {
      url: '/foo',
      params: {
        baz: { default: 456 }
      }
    }

    assert.strictEqual(utils.injectParamsToRoute(routeWithDefaults, {baz: 456}), '/foo')
  })

  it('should override regex path', function () {
    var routeWithRegexPath = {
      url: '/foo/:city?'
    }

    assert.strictEqual(utils.injectParamsToRoute(routeWithRegexPath, {city: 'istanbul'}), '/foo/istanbul')
  })

  it('should try everything at once', function () {
    var routeEmAll = {
      url: '/example/:foo?',
      params: {
        bar: { default: 123 },
        baz: { default: 456 }
      }
    }

    var params = {
      foo: 'abc',
      bar: 123,
      baz: 789,
      fubar: 'quq'
    }

    assert.strictEqual(utils.injectParamsToRoute(routeEmAll, params), '/example/abc?baz=789&fubar=quq')
  })
})

// parseOrders

describe('Unit::utils.parseOrders', function () {
  it('should work normally', function (done) {
    var routes = [
      {
        url: '/foo',
        order: 1
      },
      {
        url: '/bar'
      },
      {
        url: '/baz',
        lastOrder: 3
      }
    ]

    utils.parseOrders(routes, function (no, or, last) {
      assert.deepEqual(no, [ { url: '/bar' } ])
      assert.deepEqual(or, { '1': [ { url: '/foo', order: 1 } ] })
      assert.deepEqual(last, { '3': [ { url: '/baz', lastOrder: 3 } ] })
      done()
    })
  })
})

// prepareUrl

describe('Unit::utils.prepareUrl', function () {
  it('should work normally', function () {
    assert.strictEqual(utils.prepareUrl('/list', {a: 1}), '/list?a=1')
  })

  it('should support empty params', function () {
    assert.strictEqual(utils.prepareUrl('/list', {}), '/list')
  })

  it('should clean the url', function () {
    assert.strictEqual(utils.prepareUrl('/list-', {b: 2}), '/list?b=2')
  })
})
