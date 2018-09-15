'use strict';

var ErrorCode = require('./errorCode');
var Messages = require('./errorMsg');
// var _ = require('lodash');
var constant = require('./constant');
var config = require('../config');


/**
 * 随机数生成
 * @param n 位数
 * @param collection 选取的集合
 * @returns {string}
 */
exports.generateRandom = function(n, collection) {
    var res = '';
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * (collection.length - 1));
        res += collection[id];
    }
    return res;
};

/**
 * 生成UUID 31位
 * @returns {string}
 */
exports.generateUUID = function() {
  return exports.generateRandom(31, constant.CollectionNum.concat(constant.CollectionAlpha));
};

/*验证手机号格式*/
exports.testPhone = function(phone) {
  var regexPhone = /^0?(1[34578])[0-9]{9}$/;
  return phone && regexPhone.test(phone);
};

/**
 * 获取客户端ip
 * @param req
 * @returns {*|string}
 */
exports.getClientIP = function(req) {
  return req.headers['x-real-ip'] || req.headers['X-Real-Ip'] ||req.headers['X-Forwarded-For'] ||
    req.headers['x-forwarded-for'] || req.ip;
};

/**
 * 获取当前时间戳
 * @returns {number}
 */
exports.getNowTime = function(){
  return new Date().getTime();
};


/**
 * 结果层错误
 * @type {exports.ResultError}
 */
var ResultError = exports.ResultError = function(errcode, errmsg) {
  this.errcode = errcode;
  this.errmsg = errmsg;
};
ResultError.prototype.toString = function() {
  return this.errmsg;
};

/**
* 抛出错误信息
* @param errcode
* @param errmsg
* @returns {ResultError}
*/
exports.generateErr = function(errcode, errmsg) {
  return new ResultError(errcode, errmsg);
};

/***************************错误分类处理************************************/
/**
 * 处理层错误
 * @type {InternalError}
 */
var InternalError = exports.InternalError = function(errcode, errmsg) {
  this.errcode = errcode;
  this.errmsg = errmsg;
};
InternalError.prototype.toString = function() {
  return this.errmsg;
};

/**
 * 检测是否为结果错误
 */
var isResultError = exports.isResultError = function(e) {
  return e instanceof ResultError;
};

/**
 * 检测是否为service层错误
 * @param e
 */
var isInternalError = exports.isInternalError = function(e) {
  return e instanceof InternalError;
};

// 校验是不是自定义异常错误
var isUserDefinedError = exports.isUserDefinedError = function(e) {
  return (e instanceof Error && (e.name === 'WeiboPayError' || e.name === 'YunFarmError'));
};
/***********************错误分类处理end***********************************/


/**
 * 输出结果函数
 * @param res
 * @param error
 * @param body
 */
exports.doResult = function(res, error, body) {
  var httpStatus;
  if (error) {
    console.log('--------------doResult返回错误--------------');
    console.dir(error);
    if (isResultError(error)) {
    	console.log('e instanceof ResultError')
    } else if (isInternalError(error)) {
      error = new ResultError(ErrorCode.UnKnow_Error, error.errmsg);
    } else if (isUserDefinedError(error)) {
      var message = Messages[error.code];
      res.status((message && message.status_code) || 400);
      return res.json({
        name: error.name,
        errmsg: error.message,
        errcode: error.code,
        cause: error.cause
      });
    } else {
      error = new ResultError(ErrorCode.UnKnow_Error, '服务器错误');
    }
    var errCode = error.errcode;
    console.log('errcode: ' + error.errcode);
    httpStatus = parseInt((errCode + '').substr(0, 3));
    console.log('-----res.status(httpStatus).json(error)------');
    res.status(httpStatus).json(error);
  } else {
    httpStatus = parseInt((ErrorCode.Success + '').substr(0, 3));
    // console.log(body)
    res.status(httpStatus).json(body);
  }
};

/**
 * 加密算法
 * @param data
 * @param algorithm
 * @returns {Buffer|string}
 */
exports.digest = function(data, algorithm) {
  var crypto = require('crypto');
  algorithm || (algorithm = 'md5');
  var shasum = crypto.createHash(algorithm);
  shasum.update(data);
  var d = shasum.digest('hex');
  return d;
}

/**
 * 微信接入 验证签名
 * @param signature
 * @param timestamp
 * @param nonce
 */
exports.checkSignature = function (signature, timestamp, nonce) {

  var token =config.wechat.token;
  var arr = new Array(token, timestamp, nonce);
  // 将token、timestamp、nonce三个参数进行字典序排序
  arr = arr.sort();
};

module.exports = exports;