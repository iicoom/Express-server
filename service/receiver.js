/**
 * Created by mxj on 2018/9/7.
 */
// var q = require('q');
var Receiver = require('../models/receiver');

var log = require('../libs/log');
var logger = log.getLogger('out');

/**
 * 创建礼品领取信息
 **/
exports.create = function(ReceiverInfo, cb){
  logger.info('Service-Receiver.create')
  Receiver.create(ReceiverInfo,cb);
};

exports.findList = function (query, opt, cb) {
  logger.info('Service-Receiver.findList');
  Receiver.find(query, {}, opt, cb);
};

exports.findById = function (id, cb) {
  logger.info('Service-Receiver.findById');
  Receiver.findById(id, cb);
};

exports.findOne = function (query, cb) {
  logger.info('Service-Receiver.findOne');
  Receiver.findOne(query, cb);
};

exports.findByIdAndUpdate = function (id, updateInfo, cb) {
  logger.info('Service-Receiver.findByIdAndUpdate');

  Receiver.update({ _id: id }, { $set: updateInfo }, null, function(err,data){
    cb && cb(err, data);
  });
};

exports.count = function (query, cb) {
  logger.info('Service-Receiver.count');
  Receiver.count(query, cb);
};
