var _ = require('lodash');
var Redis = require('redis');
var config = require('../config');

var noop = require('../util/tools').noop;

var getRedisClient = exports.getRedisClient = function(rcc) {
    console.log('redis.getRedisClient');
    var rc = Redis.createClient(rcc.port, rcc.host, rcc);

    rc.on('error', function(err) {
        console.error('Redis Error: %s, %s', rcc, err);
    });

    rc.on('end', function(err) {
        console.log('Redis end: %s, %s', rcc, err);
    });

    rc.on('ready', function(err) {
        console.log('Redis ready:', rcc, err);
    });

    return rc;
}


var rc = exports.rc = getRedisClient(config.redis);


exports.get = function(key, cb) {
    console.log('redis.get');
    if (!cb) cb = noop;
    rc.get(key, cb);
}

exports.getObject = function(key, cb) {
    console.log('redis.getObject');
    if (!cb) cb = noop;
    rc.get(key, function(err, data) {
        if (err) return cb(err);
        if (data) {
            try {
                data = JSON.parse(data);
                cb(null, data);
            } catch (e) {
                cb(e);
            }
        } else {
            cb();
        }
    })
}


/**
 * [put description]
 * @param  {[type]}   key    [description]
 * @param  {[type]}   data   [description]
 * @param  {[type]}   expire [有效期，单位秒]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
 */
exports.set = exports.put = function(key, data, expire, cb) {
    if (!expire) {
        cb = noop;
    } else if (_.isFunction(expire)) {
        cb = expire;
        expire = null;
    }

    rc.set(key, data, function(err) {
        if (err) return cb(err);
        if (expire) {
            rc.expire(key, expire, cb);
        } else {
            cb();
        }
    });
}

exports.setObject = exports.putObject = function(key, data, expire, cb) {
    if (!expire) {
        cb = noop;
    } else if (_.isFunction(expire)) {
        cb = expire;
        expire = null;
    }

    try {
        data = JSON.stringify(data);
    } catch (e) {
        return cb(e);
    }

    rc.set(key, data, function(err) {
        if (err) return cb(err);
        if (expire) {
            rc.expire(key, expire, cb);
        } else {
            cb();
        }
    });
};


exports.del = function(key, cb) {
    rc.del(key, cb || noop);
};

exports.publish = function (channel, message) {
    rc.publish(channel, message);
};