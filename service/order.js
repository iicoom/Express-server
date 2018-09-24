/**
 * Created by mxj on 2018/9/22.
 */
// var Q = require('q');
// var async = require('async');

var Order = require('../models').Order;

var log = require('../libs/log');
var logger = log.getLogger('out');

/**
 * 创建订单
 *
 **/
exports.create = function(OrderInfo, cb){
  logger.info('Service-Order.create');
  Order.create(OrderInfo,cb);
};

exports.findList = function (query, opt, cb) {
  logger.info('Service-Order.findList');
  Order.find(query, {}, opt, cb);
};

exports.findById = function (id, cb) {
  logger.info('Service-Order.findById');
  Order.findById(id, cb);
};

exports.findOne = function (query, cb) {
  logger.info('Service-Order.findOne');
  Order.findOne(query, cb);
};

exports.findByIdAndUpdate = function (id, updateInfo, cb) {
  logger.info('Service-Order.findByIdAndUpdate');

  Order.update({ _id: id }, { $set: updateInfo }, null, function(err,data){
    cb && cb(err, data);
  });
};

exports.count = function (query, cb) {
  logger.info('Service-Order.count');
  Order.count(query, cb);
};
