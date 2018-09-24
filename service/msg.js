'use strict'

var Msg = require('../models/msg');
var Q = require('q');
var ranchUtil = require('../util/ranchUtil')

Msg.qFind = Q.nbind(Msg.find,Msg);
Msg.qUpdate = Q.nbind(Msg.update,Msg);
Msg.qCreate = Q.nbind(Msg.create,Msg);
Msg.qRemove = Q.nbind(Msg.remove,Msg);
Msg.qCount = Q.nbind(Msg.count,Msg);

/**
 * 发送消息
 * @param msg
 * @param cb
 */
exports.sendMsg = function(msg,cb){
    console.log('msg.sendMsg');
     Msg.qCreate(msg)
         .then(function(msgInfo){
             cb && cb(null,msgInfo);
         }).catch(function(err){
             cb && cb(err);
         })
}

// 发送系统消息

exports.sendSystemMsg = function (type, userId, content, cb) {
  var msg = {};
  msg.type = type || 0;
  msg.to_user = userId;
  msg.content = content;
  msg.create_time = ranchUtil.getNowTime();
  msg.read = false;
  exports.sendMsg(msg,cb);
}

module.exports = exports;