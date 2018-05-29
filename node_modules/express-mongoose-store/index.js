'use strict';

var Cache = require('node-cache'),
    debug = require('debug')('mongoose-store'),
    one_day = 1000 * 60 * 60 * 24;

module.exports = function (session, mongoose) {

  var MongooseStore = function (options) {
    options = options || {};
    options.modelName = options.modelName || 'Session';
    options.ttl = options.ttl || one_day;
    this.ttl = options.ttl;

    this.cache = new Cache({ stdTTL: options.cache_ttl || 300, useClones: false }),

    session.Store.call(this, options);

    this.Session = mongoose.model(options.modelName, new mongoose.Schema({
      _id: { type: mongoose.Schema.ObjectId, select: false },
      sid: { type: String, index: true },
      session: { type: String },
      created: { type: Date, default: Date.now, expires: parseInt(options.ttl / 1000, 10) },
    }, { strict: false }));
  };

  MongooseStore.prototype.__proto__ = session.Store.prototype;

  MongooseStore.prototype.get = function (sid, fn) {
    debug('GET %s', sid);
    this.cache.get(sid, function (err, data) {
      if (!err && data) {
        debug('Returning session from cache');
        return fn(null, data);
      }

      this.Session.findOne({ sid: sid }).exec(function (err, data) {
        if (err) {
          debug('GET error: %s', err);
          return fn(err);
        }

        if (!data) {
          debug('GET no session found.');
          return fn();
        }
        else {
          var result;
          try {
            result = JSON.parse(data.session);
          }
          catch(e) {
            debug('Error on JSON Parse of %s', data.session);
            debug('Error was %s', e);
            return fn(e);
          }
          debug('Setting cache and returning valid session.');
          this.cache.set(sid, result);
          return fn(null, result);
        }
      }.bind(this));
    }.bind(this));
  };

  MongooseStore.prototype.set = function (sid, sess, fn) {
    debug('SET %s', sid);
    try {
      var expires = Date.now() + this.ttl;
      if (sess.cookie) {
        sess.cookie.expires = new Date(expires);
      }
      else {
        sess.cookie = { expires: new Date(expires) };
      }

      var s = { session: JSON.stringify(sess), created: Date.now() };

      debug('Session record is: %s', JSON.stringify(s));

      this.Session.findOneAndUpdate({ sid: sid }, s, { upsert: true }).exec(function (err, data) {
        if (err) {
          debug('SET error in DB call %s', err);
          return fn(err);
        }
        debug('Session updated.');
        var result;
        try {
          debug('Try to JSON parse %s', data.session);
          result = JSON.parse(data.session);
        }
        catch(e) {
          debug('Error after SET on JSON Parse %s', err);
          return fn(err);
        }
        debug('Set cache and return the session %s', data.session);
        this.cache.set(sid, result);
        return fn(null, result);
      }.bind(this));
    }
    catch (err) {
      debug('SET error before query %s', err);
      return fn(err);
    }
  };

  MongooseStore.prototype.destroy = function (sid, fn) {
    debug('DESTROY %s', sid);
    this.Session.findOneAndRemove({ sid: sid }).exec(function (err) {
      if (err) {
        debug('DESTROY error, %s', err);
        return fn(err);
      }
      else {
        debug('DESTROY success');
        if(typeof fn === 'function'){
          return fn();
        }
      }
    });
  };

  MongooseStore.prototype.clearAll = function (fn) {
    debug('CLEARALL');
    this.Session.remove({}).exec(function (err) {
      if (err) {
        debug('CLEARALL error, %s', err);
        return fn(err);
      }
      else {
        debug('CLEARALL success');
        if(typeof fn === 'function'){
          return fn();
        }
      }
    });
  };

  MongooseStore.prototype.keepAlive = function () {
    debug('KEEPALIVE Querying Mongoose for empty set.');
    this.Session.find({ noexits: true }, function (err) {
      if (err) {
        debug('KEEPALIVE error, %s', err);
      }
      else {
        debug('KEEPALIVE success');
      }
    });
  };

  return MongooseStore;
};
