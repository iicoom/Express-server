/**
 * Created by mxj on 2018/9/7.
 */
var q = require('q');
var Receiver = require('../model/receiver');

Receiver.qUpdate = q.nbind(Receiver.update, Receiver);
/**
 * 创建礼品领取信息
 **/
exports.create = function(ReceiverInfo, cb){
  console.log('Receiver.create');
  Receiver.create(ReceiverInfo,cb);
};

exports.findList = function (query, opt, cb) {
  console.log('Receiver.findList');
  Receiver.find(query, {}, opt, cb);
};

exports.findById = function (id, cb) {
  console.log('Receiver.findById');
  Receiver.findById(id, cb);
};

exports.findOne = function (query, cb) {
  console.log('Receiver.findOne');
  Receiver.findOne(query, cb);
};

exports.findByIdAndUpdate = function (id, updateInfo, cb) {
  console.log('Receiver.findByIdAndUpdate');

  Receiver.update({ _id: id }, { $set: updateInfo }, null, function(err,data){
    cb && cb(err, data);
  });
};

exports.count = function (query, cb) {
  console.log('Receiver.count');
  Receiver.count(query, cb);
};
